import React from 'react'


const ToDoItem = ({item, delete_todo}) => {
   return (
       <tr>
           <td>
               {item.id}
           </td>
           <td>
               {item.project_name}
           </td>
           <td>
               {item.text}
           </td>
           <td>
               {item.creation_date}
           </td>
           <td>
               {item.update_date}
           </td>
           <td>
               {item.users_checklist_author}
           </td>
           <td>
               {item.status}
           </td>
           <td>
               <button onClick={() => delete_todo(item.id)} type="button">Delete</button>
           </td>
       </tr>
   )
}


const ToDoItemList = ({items, delete_todo}) => {
   return (
       <table>
                   <th>
                       TODO id
                   </th>
                   <th>
                       Project name
                   </th>
                   <th>
                       Text
                   </th>
                   <th>
                       Creation date
                   </th>
                   <th>
                       Update date
                   </th>
                   <th>
                       Authors
                   </th>
                   <th>
                       Status
                   </th>
                   <th>
                   </th>
                   {items.map((item) => <ToDoItem item={item}  delete_todo={delete_todo}/>)}
       </table>
   )
}


export default ToDoItemList