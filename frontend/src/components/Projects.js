import React from 'react'

const ProjectItem = ({item, delete_project}) => {
    return (
        <tr>
            <td>
                {item.id}
            </td>
            <td>
                {item.name}
            </td>
            <td>
                {item.users}
            </td>
            <td>
                {item.git_repo}
            </td>
            <td>
                <button onClick={() => delete_project(item.id)} type="button">Delete</button>
            </td>
        </tr>
    )
}

const ProjectItemList = ({items, delete_project}) => {
    return (
        <table>
                <th>
                    Project id
                </th>
                <th>
                    Project name
                </th>
                <th>
                    Project users
                </th>
                <th>
                    Project git repo
                </th>
                <th>
                </th>
                {items.map((item) => <ProjectItem item={item} delete_project={delete_project} />)}
        </table>
    )
}

export default ProjectItemList