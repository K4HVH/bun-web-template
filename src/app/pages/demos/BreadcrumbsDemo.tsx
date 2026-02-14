import { Breadcrumbs, BreadcrumbItem } from '../../../components/navigation/Breadcrumbs';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import { BsHouseDoor, BsFolder, BsFileText, BsGear, BsShop, BsLaptop } from 'solid-icons/bs';

export default function BreadcrumbsDemo() {
  // Basic items
  const basicItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/#home' },
    { label: 'Products', href: '/#products' },
    { label: 'Electronics', href: '/#electronics' },
    { label: 'Laptops', href: '/#laptops' },
  ];

  // Items with icons
  const itemsWithIcons: BreadcrumbItem[] = [
    { label: 'Home', href: '/#home', icon: BsHouseDoor },
    { label: 'Products', href: '/#products', icon: BsShop },
    { label: 'Electronics', href: '/#electronics', icon: BsLaptop },
    { label: 'Laptops', href: '/#laptops' },
  ];

  // Long path for collapse demo
  const longPath: BreadcrumbItem[] = [
    { label: 'Root', href: '/#root', icon: BsHouseDoor },
    { label: 'Documents', href: '/#documents', icon: BsFolder },
    { label: 'Work', href: '/#work', icon: BsFolder },
    { label: 'Projects', href: '/#projects', icon: BsFolder },
    { label: '2024', href: '/#2024', icon: BsFolder },
    { label: 'Q1', href: '/#q1', icon: BsFolder },
    { label: 'Reports', href: '/#reports', icon: BsFolder },
    { label: 'Final', href: '/#final', icon: BsFileText },
  ];

  // Items with disabled
  const itemsWithDisabled: BreadcrumbItem[] = [
    { label: 'Home', href: '/#home' },
    { label: 'Products', href: '/#products', disabled: true },
    { label: 'Electronics', href: '/#electronics' },
    { label: 'Laptops', href: '/#laptops' },
  ];

  // Real-world examples
  const ecommerceItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/#home', icon: BsHouseDoor },
    { label: 'Men', href: '/#men' },
    { label: 'Clothing', href: '/#clothing' },
    { label: 'Shirts', href: '/#shirts' },
    { label: 'Casual Shirts', href: '/#casual' },
  ];

  const fileSystemItems: BreadcrumbItem[] = [
    { label: 'Computer', href: '/#computer', icon: BsHouseDoor },
    { label: 'Users', href: '/#users', icon: BsFolder },
    { label: 'John', href: '/#john', icon: BsFolder },
    { label: 'Documents', href: '/#documents', icon: BsFolder },
    { label: 'readme.txt', href: '/#readme', icon: BsFileText },
  ];

  const adminPanelItems: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/#dashboard', icon: BsHouseDoor },
    { label: 'Settings', href: '/#settings', icon: BsGear },
    { label: 'User Management', href: '/#users' },
    { label: 'Edit Profile', href: '/#edit' },
  ];

  return (
    <>
      <h2>Breadcrumbs Component Examples</h2>

      {/* Basic Usage */}
      <Card>
        <CardHeader title="Basic Breadcrumbs" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
          <Breadcrumbs items={basicItems} />
          <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)' }}>
            Basic breadcrumb navigation with chevron separators
          </p>
        </div>
      </Card>

      {/* Variants */}
      <Card>
        <CardHeader title="Variants" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Primary (default)</h3>
            <Breadcrumbs items={basicItems} variant="primary" />
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Secondary</h3>
            <Breadcrumbs items={basicItems} variant="secondary" />
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Subtle</h3>
            <Breadcrumbs items={basicItems} variant="subtle" />
          </div>
        </div>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader title="Sizes" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Compact</h3>
            <Breadcrumbs items={basicItems} size="compact" />
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Normal (default)</h3>
            <Breadcrumbs items={basicItems} size="normal" />
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>Spacious</h3>
            <Breadcrumbs items={basicItems} size="spacious" />
          </div>
        </div>
      </Card>

      {/* With Icons */}
      <Card>
        <CardHeader title="With Icons" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Icons on selected items
            </h3>
            <Breadcrumbs items={itemsWithIcons} />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Home and category icons improve visual hierarchy
            </p>
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              File system navigation
            </h3>
            <Breadcrumbs items={fileSystemItems} variant="secondary" />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Folder and file icons make path structure clearer
            </p>
          </div>
        </div>
      </Card>

      {/* Collapsed (maxItems) */}
      <Card>
        <CardHeader title="Collapsed Navigation" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              maxItems=4
            </h3>
            <Breadcrumbs items={longPath} maxItems={4} />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Shows first item, ellipsis, then last 3 items
            </p>
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              maxItems=3
            </h3>
            <Breadcrumbs items={longPath} maxItems={3} variant="secondary" />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Shows first item, ellipsis, then last 2 items
            </p>
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Full path (no maxItems)
            </h3>
            <Breadcrumbs items={longPath} variant="subtle" size="compact" />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              All items visible - may wrap on narrow screens
            </p>
          </div>
        </div>
      </Card>

      {/* Disabled States */}
      <Card>
        <CardHeader title="Disabled States" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Individual item disabled
            </h3>
            <Breadcrumbs items={itemsWithDisabled} />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              "Products" link is disabled
            </p>
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Entire breadcrumb disabled
            </h3>
            <Breadcrumbs items={basicItems} disabled />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              All navigation links are disabled
            </p>
          </div>
        </div>
      </Card>

      {/* Real-world Examples */}
      <Card>
        <CardHeader title="Real-world Examples" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              E-Commerce
            </h3>
            <Breadcrumbs items={ecommerceItems} />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Product category navigation in an online store
            </p>
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Admin Panel
            </h3>
            <Breadcrumbs items={adminPanelItems} variant="secondary" />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Settings and configuration navigation
            </p>
          </div>
        </div>
      </Card>

      {/* Edge Cases */}
      <Card>
        <CardHeader title="Edge Cases" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Single item (homepage)
            </h3>
            <Breadcrumbs items={[{ label: 'Home', href: '/#home', icon: BsHouseDoor }]} />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              No separator shown
            </p>
          </div>
          <div>
            <h3 style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': '0.5rem' }}>
              Two items
            </h3>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/#home' },
                { label: 'Products', href: '/#products' },
              ]}
            />
            <p style={{ color: 'var(--g-text-muted)', 'font-size': 'var(--font-size-sm)', 'margin-top': '0.5rem' }}>
              Simple parent-child relationship
            </p>
          </div>
        </div>
      </Card>
    </>
  );
}
