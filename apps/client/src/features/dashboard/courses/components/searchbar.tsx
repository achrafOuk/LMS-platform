import { Button } from "#/features/shared/button/components/Button";
import { Input } from "#/features/shared/input/components/Input";
import { tags } from "../constants/tags";

export function Searchbar() {
  return (
    <aside className='w-1/4  p-4'>
        <p>Seach for courses</p>
        <div className="flex flex-row gap-2">
        <Input placeholder="Search courses" className="w-full" />
        </div>
        <div className="flex flex-col gap-2"> 
        {
            tags.map((tag) => (
            <div key={tag} className="flex flex-row gap-2">
            <input type="checkbox" name={tag} id={tag} />
            <label key={tag} >{tag}</label>
            </div>
            ))
        }
        </div>
        <Button variant="primary" className='w-full rounded-none'> Search </Button>
    </aside>
  )
}