import React from 'react'

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.name}
            </td>
            <td>
                {item.users}
            </td>
            <td>
                {item.git_repo}
            </td>
        </tr>
    )
}

const ProjectItemList = ({items}) => {
    return (
        <table>
                <th>
                    Project name
                </th>
                <th>
                    Project users
                </th>
                <th>
                    Project git repo
                </th>
                {items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}

export default ProjectItemList