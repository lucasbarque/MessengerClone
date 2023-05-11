'use client';

import { User } from '@prisma/client';

import { UserBox } from './UserBox';

interface UserListProps {
  items: User[];
}

export function UserList({ items }: UserListProps) {
  return (
    <aside className="overflow-w-auto fixed inset-y-0 left-0 block w-full border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="py-4 text-2xl font-bold text-neutral-800">
            Pessoas
          </div>
        </div>

        {items.map((item) => (
          <UserBox key={item.id} data={item} />
        ))}
      </div>
    </aside>
  );
}
