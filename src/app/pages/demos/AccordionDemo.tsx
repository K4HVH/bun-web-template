import { Component, createSignal } from 'solid-js';
import { Accordion, AccordionItem } from '../../../components/navigation/Accordion';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import { BsGear, BsLock, BsBell, BsPerson, BsPalette, BsShield } from 'solid-icons/bs';

const AccordionDemo: Component = () => {
  const [exclusiveValue, setExclusiveValue] = createSignal<string[]>(['item1']);
  const [multiValue, setMultiValue] = createSignal<string[]>(['faq1', 'faq3']);

  return (
    <>
      <h2>Accordion Component Examples</h2>

      <Card>
        <CardHeader title="Basic Accordion (Exclusive Mode)" />
        <p style={{ 'margin-bottom': 'var(--g-spacing)', color: 'var(--g-text-secondary)' }}>
          Only one item can be expanded at a time (default behavior).
        </p>
        <Accordion
          items={[
            {
              value: 'intro',
              title: 'Introduction',
              content: (
                <p>
                  Welcome to the accordion component! This is an exclusive accordion where only
                  one item can be open at a time. Click on another header to expand it and
                  automatically collapse this one.
                </p>
              ),
            },
            {
              value: 'features',
              title: 'Features',
              content: (
                <ul style={{ 'padding-left': 'var(--g-spacing-lg)', margin: 0 }}>
                  <li>Exclusive and non-exclusive expansion modes</li>
                  <li>Controlled and uncontrolled state management</li>
                  <li>Custom icons and header content</li>
                  <li>Multiple visual variants and sizes</li>
                  <li>Smooth expand/collapse animations</li>
                  <li>Full keyboard accessibility</li>
                </ul>
              ),
            },
            {
              value: 'usage',
              title: 'Usage',
              content: (
                <p>
                  Import the Accordion and AccordionItem components, or use the items prop to
                  pass an array of configuration objects. Supports both controlled and
                  uncontrolled modes via value/defaultValue props.
                </p>
              ),
            },
          ]}
          defaultValue={['intro']}
        />
      </Card>

      <Card>
        <CardHeader title="Multiple Expansion Mode" />
        <p style={{ 'margin-bottom': 'var(--g-spacing)', color: 'var(--g-text-secondary)' }}>
          Multiple items can be expanded simultaneously with <code>exclusive={'{false}'}</code>.
        </p>
        <Accordion exclusive={false} defaultValue={['q1', 'q2']}>
          <AccordionItem value="q1" title="What is SolidJS?">
            <p>
              SolidJS is a declarative, efficient, and flexible JavaScript library for building
              user interfaces. It uses fine-grained reactivity to update only what changes,
              making it extremely fast.
            </p>
          </AccordionItem>
          <AccordionItem value="q2" title="Why use MidnightUI?">
            <p>
              MidnightUI provides a comprehensive set of pre-built components with a consistent
              dark theme, saving you time and ensuring a polished user experience. All components
              are fully typed with TypeScript and thoroughly tested.
            </p>
          </AccordionItem>
          <AccordionItem value="q3" title="How do I customize the theme?">
            <p>
              The entire design system is built on CSS custom properties defined in global.css.
              You can customize colors, spacing, borders, and more by modifying these CSS variables.
            </p>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card>
        <CardHeader title="With Custom Icons" />
        <p style={{ 'margin-bottom': 'var(--g-spacing)', color: 'var(--g-text-secondary)' }}>
          Add custom icons to accordion headers for visual emphasis.
        </p>
        <Accordion
          items={[
            {
              value: 'account',
              title: 'Account Settings',
              icon: BsPerson,
              content: (
                <p>
                  Manage your account information, email preferences, and profile details. You can
                  update your password, change your email address, or delete your account here.
                </p>
              ),
            },
            {
              value: 'privacy',
              title: 'Privacy & Security',
              icon: BsLock,
              content: (
                <p>
                  Control your privacy settings, manage data sharing preferences, and configure
                  two-factor authentication for enhanced security.
                </p>
              ),
            },
            {
              value: 'notifications',
              title: 'Notification Preferences',
              icon: BsBell,
              content: (
                <p>
                  Choose which notifications you want to receive via email, push notifications,
                  or in-app alerts. Customize frequency and types of updates.
                </p>
              ),
            },
            {
              value: 'appearance',
              title: 'Appearance',
              icon: BsPalette,
              content: (
                <p>
                  Customize the look and feel of your interface. Choose between different themes,
                  adjust font sizes, and configure display density.
                </p>
              ),
            },
          ]}
        />
      </Card>

      <Card>
        <CardHeader title="Visual Variants" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--g-spacing-lg)' }}>
          <div>
            <h4 style={{ 'margin-bottom': 'var(--g-spacing-sm)' }}>Default</h4>
            <Accordion variant="default" defaultValue={['d1']}>
              <AccordionItem value="d1" title="Default styling">
                <p>Standard border with primary color on expansion.</p>
              </AccordionItem>
              <AccordionItem value="d2" title="Second item">
                <p>Consistent spacing and typography throughout.</p>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h4 style={{ 'margin-bottom': 'var(--g-spacing-sm)' }}>Emphasized</h4>
            <Accordion variant="emphasized" defaultValue={['e1']}>
              <AccordionItem value="e1" title="Emphasized styling">
                <p>Accent borders and elevated background for prominence.</p>
              </AccordionItem>
              <AccordionItem value="e2" title="Second item">
                <p>Perfect for important content that needs to stand out.</p>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h4 style={{ 'margin-bottom': 'var(--g-spacing-sm)' }}>Subtle</h4>
            <Accordion variant="subtle" defaultValue={['s1']}>
              <AccordionItem value="s1" title="Subtle styling">
                <p>Minimal borders and transparent backgrounds for a clean look.</p>
              </AccordionItem>
              <AccordionItem value="s2" title="Second item">
                <p>Great for nested accordions or less prominent sections.</p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Size Variants" />
        <div style={{ display: 'flex', 'flex-direction': 'column', gap: 'var(--g-spacing-lg)' }}>
          <div>
            <h4 style={{ 'margin-bottom': 'var(--g-spacing-sm)' }}>Compact</h4>
            <Accordion size="compact" defaultValue={['c1']}>
              <AccordionItem value="c1" title="Compact size" icon={BsGear}>
                <p>Reduced padding and font sizes for dense layouts.</p>
              </AccordionItem>
              <AccordionItem value="c2" title="Second item">
                <p>Great for sidebars or space-constrained areas.</p>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h4 style={{ 'margin-bottom': 'var(--g-spacing-sm)' }}>Normal (Default)</h4>
            <Accordion size="normal" defaultValue={['n1']}>
              <AccordionItem value="n1" title="Normal size" icon={BsGear}>
                <p>Standard padding and font sizes for most use cases.</p>
              </AccordionItem>
              <AccordionItem value="n2" title="Second item">
                <p>Balanced sizing for comfortable reading and interaction.</p>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h4 style={{ 'margin-bottom': 'var(--g-spacing-sm)' }}>Spacious</h4>
            <Accordion size="spacious" defaultValue={['sp1']}>
              <AccordionItem value="sp1" title="Spacious size" icon={BsGear}>
                <p>Generous padding and larger fonts for emphasis and readability.</p>
              </AccordionItem>
              <AccordionItem value="sp2" title="Second item">
                <p>Ideal for featured content or landing pages.</p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Disabled Items" />
        <p style={{ 'margin-bottom': 'var(--g-spacing)', color: 'var(--g-text-secondary)' }}>
          Individual items can be disabled to prevent interaction.
        </p>
        <Accordion>
          <AccordionItem value="enabled1" title="Enabled item" icon={BsShield}>
            <p>This item can be expanded and collapsed normally.</p>
          </AccordionItem>
          <AccordionItem value="disabled" title="Disabled item (cannot expand)" icon={BsLock} disabled>
            <p>This content won't be visible because the item is disabled.</p>
          </AccordionItem>
          <AccordionItem value="enabled2" title="Another enabled item">
            <p>Disabled items appear dimmed and do not respond to clicks.</p>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card>
        <CardHeader title="Controlled Accordion" />
        <p style={{ 'margin-bottom': 'var(--g-spacing)', color: 'var(--g-text-secondary)' }}>
          Control expansion state externally. Current: [{exclusiveValue().join(', ')}]
        </p>
        <Accordion
          value={exclusiveValue()}
          onChange={setExclusiveValue}
          exclusive
        >
          <AccordionItem value="item1" title="Item One">
            <p>Expansion state is controlled by the parent component.</p>
          </AccordionItem>
          <AccordionItem value="item2" title="Item Two">
            <p>Click to update the external state.</p>
          </AccordionItem>
          <AccordionItem value="item3" title="Item Three">
            <p>Only one item can be open in exclusive mode.</p>
          </AccordionItem>
        </Accordion>
      </Card>

      <Card>
        <CardHeader title="Controlled Multiple Expansion" />
        <p style={{ 'margin-bottom': 'var(--g-spacing)', color: 'var(--g-text-secondary)' }}>
          Control multiple items externally. Current: [{multiValue().join(', ')}]
        </p>
        <Accordion
          value={multiValue()}
          onChange={setMultiValue}
          exclusive={false}
        >
          <AccordionItem value="faq1" title="Can I have multiple items open?">
            <p>Yes! When exclusive is false, you can have multiple items expanded simultaneously.</p>
          </AccordionItem>
          <AccordionItem value="faq2" title="Is the state controlled externally?">
            <p>Yes, this accordion is controlled via the value prop.</p>
          </AccordionItem>
          <AccordionItem value="faq3" title="Can I toggle items programmatically?">
            <p>Absolutely! Just update the value array in your state management.</p>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};

export default AccordionDemo;
