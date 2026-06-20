import z from "zod";

const lessonValidator = z.object({
  title: z.string().min(1, "Lesson title is required"),
  videoLink: z.string().url("Enter a valid video URL"),
  order: z.number().min(1),
});

const moduleValidator = z.object({
  title: z.string().min(1, "Module title is required"),
  order: z.number().min(1),
  lessions: z.array(lessonValidator).min(1, "Add at least one lesson").max(1, "Maximum 1 lessons"),
});

function validateSequentialOrder(
  orders: number[],
  ctx: z.RefinementCtx,
  options: {
    notValidMessage: string;
    indexNotValidMessage: string;
    path?: (string | number)[];
  },
) {
  for (let i = 0; i < orders.length - 1; i++) {
    if (orders[i]! >= orders[i + 1]!) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: options.notValidMessage,
        path: options.path,
      });
    }
    if (orders[i]! !== i + 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: options.indexNotValidMessage,
        path: options.path,
      });
    }
  }

  if (orders.length > 0 && orders[orders.length - 1] !== orders.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: options.indexNotValidMessage,
      path: options.path,
    });
  }
}

export const courseValidator = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
    image: z.string().min(1).optional(),
    category: z.string().min(1),
    modules: z.array(moduleValidator).min(1, "Add at least one module").max(30, "Maximum 30 module"),
  })
  .superRefine((data, ctx) => {
    
    validateSequentialOrder(
      data.modules.map((module) => module.order),
      ctx,
      {
        notValidMessage: "Modules order is not valid",
        indexNotValidMessage: "Modules order index is not valid",
        path: ["modules"],
      },
    );

    data.modules.forEach((module, moduleIndex) => {
      if (module.lessions.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Add at least one lesson",
          path: ["modules", moduleIndex, "lessions"],
        });
      }

      validateSequentialOrder(
        module.lessions.map((lesson) => lesson.order),
        ctx,
        {
          notValidMessage: "Lessons order is not valid",
          indexNotValidMessage: "Lessons order index is not valid",
          path: ["modules", moduleIndex, "lessions"],
        },
      );
    });
});

export const courseSlugValidator = z.object({
  slug: z.string().min(1),
});



export type CourseValidatorType = z.infer<typeof courseValidator>;
export type ModuleValidatorType = z.infer<typeof moduleValidator>;
export type LessonValidatorType = z.infer<typeof lessonValidator>;
