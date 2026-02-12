import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { Card, CardHeader } from '../../../components/surfaces/Card';
import { Menu, MenuItem, MenuSeparator } from '../../../components/navigation/Menu';
import { Button } from '../../../components/inputs/Button';
import { BsThreeDots, BsGear, BsTrash, BsPencil, BsCopy, BsDownload, BsShare } from 'solid-icons/bs';

const MenuDemo: Component = () => {
  const [lastAction, setLastAction] = createSignal<string>('');

  const handleAction = (action: string) => {
    setLastAction(action);
    console.log('Action:', action);
  };

  return (
    <>
      <h2>Menu Component Examples</h2>

      <Card>
        <CardHeader title="Basic Menu" subtitle="Simple dropdown menu with actions" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'align-items': 'center' }}>
          <Menu
            trigger={<Button>Actions</Button>}
          >
            <MenuItem onClick={() => handleAction('edit')}>
              <BsPencil style={{ 'margin-right': 'var(--g-spacing-xs)' }} />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleAction('copy')}>
              <BsCopy style={{ 'margin-right': 'var(--g-spacing-xs)' }} />
              Copy
            </MenuItem>
            <MenuSeparator />
            <MenuItem onClick={() => handleAction('delete')}>
              <BsTrash style={{ 'margin-right': 'var(--g-spacing-xs)', color: 'var(--color-danger)' }} />
              <span style={{ color: 'var(--color-danger)' }}>Delete</span>
            </MenuItem>
          </Menu>

          {lastAction() && (
            <span style={{ color: 'var(--g-text-secondary)' }}>
              Last action: <strong>{lastAction()}</strong>
            </span>
          )}
        </div>
      </Card>

      <Card>
        <CardHeader title="Trigger Types" subtitle="Click, right-click, or both" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'flex-wrap': 'wrap' }}>
          <Menu
            trigger={<Button>Click to Open</Button>}
            openOn="click"
          >
            <MenuItem onClick={() => handleAction('click-only')}>Click Trigger Only</MenuItem>
            <MenuItem>Another Action</MenuItem>
          </Menu>

          <Menu
            trigger={
              <div style={{
                padding: 'var(--g-spacing)',
                border: 'var(--g-border-width) dashed var(--g-border-color)',
                'border-radius': 'var(--g-radius)',
                cursor: 'context-menu',
              }}>
                Right-click me
              </div>
            }
            openOn="contextmenu"
          >
            <MenuItem onClick={() => handleAction('context-menu')}>Context Menu Item</MenuItem>
            <MenuItem>Another Action</MenuItem>
          </Menu>

          <Menu
            trigger={<Button>Both Triggers</Button>}
            openOn="both"
          >
            <MenuItem onClick={() => handleAction('both')}>Works with Click or Right-Click</MenuItem>
            <MenuItem>Another Action</MenuItem>
          </Menu>
        </div>
      </Card>

      <Card>
        <CardHeader title="Variants" subtitle="Default, emphasized, and subtle styles" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'flex-wrap': 'wrap' }}>
          <Menu
            trigger={<Button>Default</Button>}
            variant="default"
          >
            <MenuItem>Action 1</MenuItem>
            <MenuItem>Action 2</MenuItem>
            <MenuItem>Action 3</MenuItem>
          </Menu>

          <Menu
            trigger={<Button variant="primary">Emphasized</Button>}
            variant="emphasized"
          >
            <MenuItem>Action 1</MenuItem>
            <MenuItem>Action 2</MenuItem>
            <MenuItem>Action 3</MenuItem>
          </Menu>

          <Menu
            trigger={<Button variant="subtle">Subtle</Button>}
            variant="subtle"
          >
            <MenuItem>Action 1</MenuItem>
            <MenuItem>Action 2</MenuItem>
            <MenuItem>Action 3</MenuItem>
          </Menu>
        </div>
      </Card>

      <Card>
        <CardHeader title="Sizes" subtitle="Compact, normal, and spacious" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'flex-wrap': 'wrap' }}>
          <Menu
            trigger={<Button size="compact">Compact</Button>}
            size="compact"
          >
            <MenuItem>Short Menu</MenuItem>
            <MenuItem>Action 2</MenuItem>
            <MenuItem>Action 3</MenuItem>
          </Menu>

          <Menu
            trigger={<Button>Normal</Button>}
            size="normal"
          >
            <MenuItem>Normal Size</MenuItem>
            <MenuItem>Action 2</MenuItem>
            <MenuItem>Action 3</MenuItem>
          </Menu>

          <Menu
            trigger={<Button size="spacious">Spacious</Button>}
            size="spacious"
          >
            <MenuItem>Large Menu</MenuItem>
            <MenuItem>Action 2</MenuItem>
            <MenuItem>Action 3</MenuItem>
          </Menu>
        </div>
      </Card>

      <Card>
        <CardHeader title="Placement" subtitle="Different menu positions" />
        <div style={{ display: 'grid', 'grid-template-columns': 'repeat(3, 1fr)', gap: 'var(--g-spacing)', 'align-items': 'start' }}>
          <Menu
            trigger={<Button>Bottom Start</Button>}
            placement="bottom-start"
          >
            <MenuItem>Below, aligned left</MenuItem>
            <MenuItem>Action 2</MenuItem>
          </Menu>

          <Menu
            trigger={<Button>Bottom End</Button>}
            placement="bottom-end"
          >
            <MenuItem>Below, aligned right</MenuItem>
            <MenuItem>Action 2</MenuItem>
          </Menu>

          <Menu
            trigger={<Button>Top Start</Button>}
            placement="top-start"
          >
            <MenuItem>Above, aligned left</MenuItem>
            <MenuItem>Action 2</MenuItem>
          </Menu>

          <Menu
            trigger={<Button>Top End</Button>}
            placement="top-end"
          >
            <MenuItem>Above, aligned right</MenuItem>
            <MenuItem>Action 2</MenuItem>
          </Menu>

          <Menu
            trigger={<Button>Right</Button>}
            placement="right-start"
          >
            <MenuItem>To the right</MenuItem>
            <MenuItem>Action 2</MenuItem>
          </Menu>

          <Menu
            trigger={<Button>Left</Button>}
            placement="left-start"
          >
            <MenuItem>To the left</MenuItem>
            <MenuItem>Action 2</MenuItem>
          </Menu>
        </div>
      </Card>

      <Card>
        <CardHeader title="Icon Button Trigger" subtitle="Common pattern for action menus" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing)' }}>
          <Menu
            trigger={
              <Button variant="subtle" icon={BsThreeDots} aria-label="More actions" />
            }
          >
            <MenuItem onClick={() => handleAction('settings')}>
              <BsGear style={{ 'margin-right': 'var(--g-spacing-xs)' }} />
              Settings
            </MenuItem>
            <MenuItem onClick={() => handleAction('share')}>
              <BsShare style={{ 'margin-right': 'var(--g-spacing-xs)' }} />
              Share
            </MenuItem>
            <MenuItem onClick={() => handleAction('download')}>
              <BsDownload style={{ 'margin-right': 'var(--g-spacing-xs)' }} />
              Download
            </MenuItem>
            <MenuSeparator />
            <MenuItem onClick={() => handleAction('delete')} disabled>
              <BsTrash style={{ 'margin-right': 'var(--g-spacing-xs)' }} />
              Delete (disabled)
            </MenuItem>
          </Menu>

          <span style={{ 'align-self': 'center', color: 'var(--g-text-secondary)' }}>
            Three-dot menu pattern
          </span>
        </div>
      </Card>

      <Card>
        <CardHeader title="Custom Content" subtitle="Menu is just a positioned surface - add any content" />
        <Menu
          trigger={<Button>Custom Menu</Button>}
        >
          <div style={{ padding: 'var(--g-spacing-sm)' }}>
            <h4 style={{ margin: '0 0 var(--g-spacing-xs) 0', 'font-size': 'var(--font-size-sm)' }}>
              Menu Title
            </h4>
            <p style={{ margin: '0 0 var(--g-spacing-sm) 0', 'font-size': 'var(--font-size-sm)', color: 'var(--g-text-secondary)' }}>
              You can put any content in here - text, inputs, custom components, etc.
            </p>
            <MenuSeparator />
            <MenuItem>Still works with MenuItem</MenuItem>
            <MenuItem>Or use custom elements</MenuItem>
          </div>
        </Menu>
      </Card>

      <Card>
        <CardHeader title="Auto-Flip" subtitle="Menu automatically flips to stay in viewport" />
        <div style={{ height: '200px', display: 'flex', 'align-items': 'flex-end', 'justify-content': 'flex-end' }}>
          <Menu
            trigger={<Button>Open Near Edge</Button>}
            autoFlip={true}
          >
            <MenuItem>This menu will flip</MenuItem>
            <MenuItem>To stay in the viewport</MenuItem>
            <MenuItem>When near the edge</MenuItem>
            <MenuItem>Try it at different screen sizes</MenuItem>
          </Menu>
        </div>
      </Card>

      <Card>
        <CardHeader title="Anchored vs Unanchored" subtitle="Control whether menu follows trigger on scroll" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing)', 'flex-wrap': 'wrap' }}>
          <div>
            <p style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': 'var(--g-spacing-xs)', color: 'var(--g-text-secondary)' }}>
              Anchored (default): follows trigger on scroll
            </p>
            <Menu
              trigger={<Button>Anchored Menu</Button>}
              anchored={true}
            >
              <MenuItem>This menu</MenuItem>
              <MenuItem>follows the button</MenuItem>
              <MenuItem>when you scroll</MenuItem>
            </Menu>
          </div>

          <div>
            <p style={{ 'font-size': 'var(--font-size-sm)', 'margin-bottom': 'var(--g-spacing-xs)', color: 'var(--g-text-secondary)' }}>
              Unanchored: stays fixed in viewport
            </p>
            <Menu
              trigger={<Button variant="secondary">Unanchored Menu</Button>}
              anchored={false}
            >
              <MenuItem>This menu</MenuItem>
              <MenuItem>stays in place</MenuItem>
              <MenuItem>when you scroll</MenuItem>
            </Menu>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Nested Submenus" subtitle="Hover over items to reveal submenus" />
        <div style={{ display: 'flex', gap: 'var(--g-spacing)' }}>
          <Menu
            trigger={<Button>File</Button>}
          >
            <MenuItem onClick={() => handleAction('new')}>New File</MenuItem>
            <MenuItem
              submenu={() => (
                <>
                  <MenuItem onClick={() => handleAction('open-recent-1')}>Project 1</MenuItem>
                  <MenuItem onClick={() => handleAction('open-recent-2')}>Project 2</MenuItem>
                  <MenuItem onClick={() => handleAction('open-recent-3')}>Project 3</MenuItem>
                  <MenuSeparator />
                  <MenuItem onClick={() => handleAction('clear-recent')}>Clear Recent</MenuItem>
                </>
              )}
            >
              Open Recent
            </MenuItem>
            <MenuItem
              submenu={() => (
                <>
                  <MenuItem onClick={() => handleAction('export-json')}>Export as JSON</MenuItem>
                  <MenuItem onClick={() => handleAction('export-csv')}>Export as CSV</MenuItem>
                  <MenuItem
                    submenu={() => (
                      <>
                        <MenuItem onClick={() => handleAction('export-pdf-a4')}>A4</MenuItem>
                        <MenuItem onClick={() => handleAction('export-pdf-letter')}>Letter</MenuItem>
                      </>
                    )}
                  >
                    Export as PDF
                  </MenuItem>
                </>
              )}
            >
              Export
            </MenuItem>
            <MenuSeparator />
            <MenuItem onClick={() => handleAction('save')}>Save</MenuItem>
            <MenuItem onClick={() => handleAction('save-as')}>Save As...</MenuItem>
          </Menu>

          {lastAction() && (
            <span style={{ 'align-self': 'center', color: 'var(--g-text-secondary)' }}>
              Last action: <strong>{lastAction()}</strong>
            </span>
          )}
        </div>
      </Card>
    </>
  );
};

export default MenuDemo;
