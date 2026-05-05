import { useState } from 'react'
import type { User } from '../../types/user'
import { mockUsers } from '../../data/users'
import UserTable from '../../components/users/UserTable'
import UserDetailPanel from '../../components/users/UserDetailPanel'
import EditUserModal from '../../components/users/EditUserModal'
import CreateUserModal from '../../components/users/CreateUserModal'

function AddUserBtn({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 20px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#5C3FEE',
        backgroundColor: hovered ? '#F4F2FF' : 'transparent',
        border: '1px solid #5C3FEE',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: "'Space Grotesk', sans-serif",
        transition: 'background 0.15s',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      Add New User
    </button>
  )
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  function handleView(user: User) { setSelectedUser(user) }
  function handleEdit(user: User) { setEditingUser(user) }

  function handleDelete(userId: number) {
    setUsers(prev => prev.filter(u => u.id !== userId))
    if (selectedUser?.id === userId) setSelectedUser(null)
  }

  function handleUpdate(updated: User) {
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u))
    if (selectedUser?.id === updated.id) setSelectedUser(updated)
    setEditingUser(null)
  }

  function handleCreate(newUser: Omit<User, 'id'>) {
    const maxId = Math.max(...users.map(u => u.id), 0)
    setUsers(prev => [...prev, { ...newUser, id: maxId + 1 }])
    setIsCreating(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#FFFFFF' }}>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Page Header */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{
            padding: '20px 32px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #ECECEC',
          }}
        >
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#262A33',
            margin: 0,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            User Management
          </h1>
          <AddUserBtn onClick={() => setIsCreating(true)} />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#FFFFFF' }}>
          <UserTable
            users={users}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Detail Panel Overlay */}
      {selectedUser && (
        <UserDetailPanel
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onEdit={handleEdit}
        />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdate}
        />
      )}

      {isCreating && (
        <CreateUserModal
          onClose={() => setIsCreating(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  )
}
