import { useState, useEffect } from 'react'
import {
    BanIcon,
    CheckCircleIcon,
} from '@heroicons/react/outline'
import SortSelectMenu from '../../components/SelectMenus/sortSelectMenu'
import api from '../../util/api'
import ApproveUserList from './approveUserList'
import ThreadPaginator from '../../components/Paginator/threadPaginator'


const sortTypes = [
    { id: 1, name: 'Recent', sortType: 'created', reverse: false },
    { id: 2, name: 'Email', sortType: 'email', reverse: true },
    { id: 2, name: 'Username', sortType: 'username', reverse: true },
    { id: 2, name: 'Status', sortType: 'accountStatus', reverse: true },
]

export default function ApproveTab({ searchString, searchType }) {
    const [allUsers, setAllUsers] = useState([])
    const [sortType, setSortType] = useState(sortTypes[0])

    useEffect(() => {
        api.getUsers()
            .then(response => {
                const searchSortItems = (type, searchString, searchType) => {
                    const types = {
                        created: 'created',
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
                    const filtered = [...response.data]
                        .filter((user) => (user.accountStatus === 'UNAPPROVED' || user.accountStatus === 'REJECTED') && user.accountType === "STAFF")
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
                    setAllUsers(sorted)
                }
                searchSortItems(sortType.sortType, searchString, searchType.searchType)
                // setAllUsers(users.data.filter((user) => (user.accountStatus === 'UNAPPROVED' || user.accountStatus === 'REJECTED') && user.accountType === "STAFF"));
            })
    }, [sortType.sortType, searchString, searchType.searchType])

    function approve(user) {
        user.accountStatus = 'ACTIVE'
        api.editUser(user.id, user)
            .then(() => {
                api.getUsers()
                    .then((response) => setAllUsers(response.data.filter((user) => (user.accountStatus === 'UNAPPROVED' || user.accountStatus === 'REJECTED') && user.accountType === "STAFF")))
            })
    }

    function disapprove(user) {
        user.accountStatus = 'REJECTED'
        api.editUser(user.id, user)
            .then(() => {
                api.getUsers()
                    .then((response) => setAllUsers(response.data.filter((user) => (user.accountStatus === 'UNAPPROVED' || user.accountStatus === 'REJECTED') && user.accountType === "STAFF")))
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
                component={ApproveUserList}
                dataLimit={8}
                approve={approve}
                reject={disapprove}
            />
        </div>
    )
}