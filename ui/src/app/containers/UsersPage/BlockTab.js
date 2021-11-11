import { useState, useEffect } from 'react'
import SortSelectMenu from '../../components/SelectMenus/sortSelectMenu'
import api from '../../util/api'
import ThreadPaginator from '../../components/Paginator/threadPaginator'
import BlockUserList from './blockUserList'

const sortTypes = [
    { id: 1, name: 'Recent', sortType: 'created', reverse: false },
    { id: 2, name: 'Email', sortType: 'email', reverse: true },
    { id: 2, name: 'Username', sortType: 'username', reverse: true },
    { id: 2, name: 'Role', sortType: 'accountType', reverse: true },
    { id: 2, name: 'Status', sortType: 'accountStatus', reverse: true },
]

export default function BlockTab({ searchString, searchType }) {
    const [allUsers, setAllUsers] = useState([])
    const [sortType, setSortType] = useState(sortTypes[0])

    useEffect(() => {
        api.getUsers()
            .then(response => {
                const searchSortItems = (type, searchString, searchType) => {
                    const types = {
                        created: 'created',
                        accountType: 'accountType',
                        accountStatus: 'accountStatus',
                        email: 'email',
                        username: 'username',
                    }
                    const searchTypes = {
                        username: 'username',
                        email: 'email',
                    }
                    const sortProperty = types[type]
                    const searchProperty = searchTypes[searchType]
                    const filtered = [...response.data.filter((user) => (user.accountStatus === 'ACTIVE' || user.accountStatus === 'BLOCKED') && user.accountType !== "ADMIN")]
                        .filter((user) => {
                            if (searchString === '') {
                                return user
                            } else if (user[searchProperty].toLowerCase().includes(searchString.toLowerCase())) {
                                return user
                            }
                        })
                    const sorted = [...filtered]
                        .sort((x, y) => y[sortProperty].localeCompare(x[sortProperty])
                            || y['created'].localeCompare(x['created']))
                    setAllUsers(sorted);
                }
                searchSortItems(sortType.sortType, searchString, searchType.searchType)
                // setAllUsers(users.data.filter((user) => (user.accountStatus === 'ACTIVE' || user.accountStatus === 'BLOCKED') && user.accountType !== "ADMIN"));
            })
    }, [sortType.sortType, searchString, searchType.searchType])

    function toggleBlock(user) {
        user.accountStatus = user.accountStatus === 'BLOCKED' ? 'ACTIVE' : 'BLOCKED'
        api.editUser(user.id, user)
            .then(() => {
                api.getUsers()
                    .then((response) => setAllUsers(response.data.filter((user) => (user.accountStatus === 'ACTIVE' || user.accountStatus === 'BLOCKED') && user.accountType !== "ADMIN")))
            })
    }

    return (
        allUsers &&
        <div>
            <div className="pt-6 pb-4">
                <SortSelectMenu options={sortTypes} sortType={sortType} setSortType={setSortType} />
            </div>
            <ThreadPaginator
                data={allUsers}
                component={BlockUserList}
                dataLimit={8}
                toggleBlock={toggleBlock}
            />
        </div>
    )
}