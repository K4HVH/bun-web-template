import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import { Table, type Column } from '../../../components/display/Table';
import { Badge } from '../../../components/display/Badge';
import { Button } from '../../../components/inputs/Button';
import { Pagination } from '../../../components/navigation/Pagination';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joined: string;
}

const sampleUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', joined: '2024-01-15' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'active', joined: '2024-02-20' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'inactive', joined: '2024-03-10' },
  { id: '4', name: 'David Brown', email: 'david@example.com', role: 'User', status: 'pending', joined: '2024-04-05' },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'active', joined: '2024-05-12' },
  { id: '6', name: 'Frank Wilson', email: 'frank@example.com', role: 'User', status: 'active', joined: '2024-06-18' },
  { id: '7', name: 'Grace Lee', email: 'grace@example.com', role: 'Editor', status: 'inactive', joined: '2024-07-22' },
  { id: '8', name: 'Henry Martinez', email: 'henry@example.com', role: 'User', status: 'active', joined: '2024-08-30' },
];

const manyUsers: User[] = [
  ...sampleUsers,
  { id: '9', name: 'Ivy Garcia', email: 'ivy@example.com', role: 'User', status: 'active', joined: '2024-09-14' },
  { id: '10', name: 'Jack Robinson', email: 'jack@example.com', role: 'Admin', status: 'pending', joined: '2024-10-08' },
  { id: '11', name: 'Karen Taylor', email: 'karen@example.com', role: 'Editor', status: 'active', joined: '2024-11-03' },
  { id: '12', name: 'Leo Anderson', email: 'leo@example.com', role: 'User', status: 'inactive', joined: '2024-12-01' },
];

// Generate larger dataset for pagination example
const largeUserList: User[] = Array.from({ length: 50 }, (_, i) => {
  const id = String(i + 1);
  const names = ['Alex', 'Bailey', 'Charlie', 'Dana', 'Eli', 'Finn', 'Gray', 'Harper', 'Iris', 'Jordan'];
  const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  const roles = ['Admin', 'User', 'Editor'];
  const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];

  const firstName = names[i % names.length];
  const lastName = surnames[Math.floor(i / names.length) % surnames.length];
  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i > 9 ? i : ''}@example.com`;
  const role = roles[i % roles.length];
  const status = statuses[i % statuses.length];
  const month = String((i % 12) + 1).padStart(2, '0');
  const day = String((i % 28) + 1).padStart(2, '0');
  const joined = `2024-${month}-${day}`;

  return { id, name, email, role, status, joined };
});

const TableDemo: Component = () => {
  const [selectedRows, setSelectedRows] = createSignal<Set<string>>(new Set());
  const [sortKey, setSortKey] = createSignal<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = createSignal<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = createSignal(false);

  // Pagination state
  const [currentPage, setCurrentPage] = createSignal(1);
  const pageSize = 10;
  const totalPages = () => Math.ceil(largeUserList.length / pageSize);

  // Get paginated data slice
  const paginatedUsers = () => {
    const startIndex = (currentPage() - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return largeUserList.slice(startIndex, endIndex);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const sortedUsers = () => {
    if (!sortKey()) return sampleUsers;

    const sorted = [...sampleUsers].sort((a, b) => {
      const aVal = a[sortKey() as keyof User];
      const bVal = b[sortKey() as keyof User];

      if (aVal < bVal) return sortDirection() === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection() === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const basicColumns: Column<User>[] = [
    {
      key: 'name',
      header: 'Name',
      cell: (row) => row.name,
      width: '200px',
    },
    {
      key: 'email',
      header: 'Email',
      cell: (row) => row.email,
    },
    {
      key: 'role',
      header: 'Role',
      cell: (row) => row.role,
      width: '120px',
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => {
        const colorMap = {
          active: 'var(--color-success)',
          inactive: 'var(--color-gray-500)',
          pending: 'var(--color-warning)',
        };
        return (
          <span style={{
            display: 'inline-block',
            padding: '2px 8px',
            'border-radius': 'var(--radius-sm)',
            'font-size': 'var(--font-size-sm)',
            'font-weight': 'var(--font-weight-medium)',
            background: colorMap[row.status],
            color: row.status === 'pending' ? 'var(--color-black)' : 'var(--color-white)',
          }}>
            {row.status}
          </span>
        );
      },
      width: '120px',
      align: 'center',
    },
    {
      key: 'joined',
      header: 'Joined',
      cell: (row) => row.joined,
      width: '120px',
    },
  ];

  const actionColumns: Column<User>[] = [
    ...basicColumns,
    {
      key: 'actions',
      header: 'Actions',
      cell: (row) => (
        <div style={{ display: 'flex', gap: 'var(--g-spacing-xs)' }}>
          <Button size="compact" variant="secondary" onClick={() => console.log('Edit', row.id)}>
            Edit
          </Button>
          <Button size="compact" variant="danger" onClick={() => console.log('Delete', row.id)}>
            Delete
          </Button>
        </div>
      ),
      width: '160px',
      align: 'right',
      sortable: false,
    },
  ];

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      <h2>Table Component Examples</h2>

      <Card>
        <CardHeader title="Basic Table" subtitle="Simple table with data display" />
        <Table
          columns={basicColumns}
          data={sampleUsers}
          getRowId={(row) => row.id}
        />
      </Card>

      <Card>
        <CardHeader title="With Selection" subtitle="Multi-select rows with checkboxes" />
        <div style={{ "margin-bottom": "var(--g-spacing)" }}>
          <strong>Selected:</strong> {selectedRows().size} row(s)
          {selectedRows().size > 0 && (
            <Button
              size="compact"
              variant="subtle"
              onClick={() => setSelectedRows(new Set())}
              style={{ "margin-left": "var(--g-spacing)" }}
            >
              Clear Selection
            </Button>
          )}
        </div>
        <Table
          columns={basicColumns}
          data={sampleUsers}
          getRowId={(row) => row.id}
          selectable
          selectedRows={selectedRows()}
          onSelectionChange={setSelectedRows}
        />
      </Card>

      <Card>
        <CardHeader title="With Sorting" subtitle="Click column headers to sort" />
        <div style={{ "margin-bottom": "var(--g-spacing)", color: "var(--g-text-secondary)" }}>
          {sortKey() ? `Sorted by: ${sortKey()} (${sortDirection()})` : 'Click a column header to sort'}
        </div>
        <Table
          columns={basicColumns}
          data={sortedUsers()}
          getRowId={(row) => row.id}
          sortKey={sortKey()}
          sortDirection={sortDirection()}
          onSort={handleSort}
        />
      </Card>

      <Card>
        <CardHeader title="With Actions" subtitle="Inline action buttons per row" />
        <Table
          columns={actionColumns}
          data={sampleUsers}
          getRowId={(row) => row.id}
          selectable
        />
      </Card>

      <Card>
        <CardHeader title="Variants" subtitle="Default, emphasized, and subtle styles" />
        <div class="grid--sm">
          <div>
            <h4>Default</h4>
            <Table
              columns={basicColumns.slice(0, 3)}
              data={sampleUsers.slice(0, 3)}
              getRowId={(row) => row.id}
            />
          </div>
          <div>
            <h4>Emphasized</h4>
            <Table
              variant="emphasized"
              columns={basicColumns.slice(0, 3)}
              data={sampleUsers.slice(0, 3)}
              getRowId={(row) => row.id}
            />
          </div>
          <div>
            <h4>Subtle</h4>
            <Table
              variant="subtle"
              columns={basicColumns.slice(0, 3)}
              data={sampleUsers.slice(0, 3)}
              getRowId={(row) => row.id}
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Sizes" subtitle="Compact, normal, and spacious density" />
        <div class="grid--sm">
          <div>
            <h4>Compact</h4>
            <Table
              size="compact"
              columns={basicColumns.slice(0, 3)}
              data={sampleUsers.slice(0, 3)}
              getRowId={(row) => row.id}
              selectable
            />
          </div>
          <div>
            <h4>Normal</h4>
            <Table
              columns={basicColumns.slice(0, 3)}
              data={sampleUsers.slice(0, 3)}
              getRowId={(row) => row.id}
              selectable
            />
          </div>
          <div>
            <h4>Spacious</h4>
            <Table
              size="spacious"
              columns={basicColumns.slice(0, 3)}
              data={sampleUsers.slice(0, 3)}
              getRowId={(row) => row.id}
              selectable
            />
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Sticky Header" subtitle="Header stays visible when scrolling" />
        <div style={{ height: '300px', overflow: 'auto' }}>
          <Table
            columns={basicColumns}
            data={manyUsers}
            getRowId={(row) => row.id}
            stickyHeader
            selectable
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Loading State" subtitle="Skeleton rows while data loads" />
        <div style={{ "margin-bottom": "var(--g-spacing)" }}>
          <Button onClick={simulateLoading} disabled={isLoading()}>
            {isLoading() ? 'Loading...' : 'Simulate Loading'}
          </Button>
        </div>
        <Table
          columns={basicColumns}
          data={sampleUsers}
          getRowId={(row) => row.id}
          loading={isLoading()}
        />
      </Card>

      <Card>
        <CardHeader title="Empty State" subtitle="Message when no data is available" />
        <Table
          columns={basicColumns}
          data={[]}
          getRowId={(row) => row.id}
          emptyMessage="No users found. Try adjusting your filters."
        />
      </Card>

      <Card>
        <CardHeader title="Full Featured" subtitle="All features combined" />
        <Table
          columns={actionColumns}
          data={sortedUsers()}
          getRowId={(row) => row.id}
          variant="emphasized"
          size="normal"
          selectable
          selectedRows={selectedRows()}
          onSelectionChange={setSelectedRows}
          sortKey={sortKey()}
          sortDirection={sortDirection()}
          onSort={handleSort}
          stickyHeader={false}
        />
      </Card>

      <Card>
        <CardHeader
          title="Paginated Table"
          subtitle="Table with Pagination component - 50 users, 10 per page"
        />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <Table
            columns={basicColumns}
            data={paginatedUsers()}
            getRowId={(row) => row.id}
            variant="default"
            size="compact"
          />

          <div style={{
            display: 'flex',
            'justify-content': 'space-between',
            'align-items': 'center',
            'padding-top': '0.5rem',
            'border-top': '1px solid var(--g-border-color)'
          }}>
            <p style={{
              color: 'var(--g-text-muted)',
              'font-size': 'var(--font-size-sm)'
            }}>
              Showing {((currentPage() - 1) * pageSize) + 1}-{Math.min(currentPage() * pageSize, largeUserList.length)} of {largeUserList.length} users
            </p>

            <Pagination
              page={currentPage()}
              totalPages={totalPages()}
              onPageChange={setCurrentPage}
              size="compact"
              variant="primary"
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default TableDemo;
