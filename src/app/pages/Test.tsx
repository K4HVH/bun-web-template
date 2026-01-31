import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { GridBackground } from '../../components/GridBackground';
import { Card, CardHeader } from '../../components/Card';
import { Checkbox } from '../../components/Checkbox';
import { RadioGroup } from '../../components/RadioGroup';
import { Combobox } from '../../components/Combobox';
import { Button } from '../../components/Button';
import { ButtonGroup } from '../../components/ButtonGroup';
import { Spinner } from '../../components/Spinner';
import { getCSSVariable } from '../../utils/cssVariables';
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill, BsStar, BsStarFill, BsPlus, BsTrash, BsPencil, BsDownload, BsUpload, BsGear, BsCircle, BsSquare, BsTriangle } from 'solid-icons/bs';

const Test: Component = () => {
  const [checked1, setChecked1] = createSignal(false);
  const [checked2, setChecked2] = createSignal(true);
  const [checked3, setChecked3] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [radioValue1, setRadioValue1] = createSignal('option2');
  const [radioValue2, setRadioValue2] = createSignal('green');
  const [radioValue3, setRadioValue3] = createSignal('star');
  const [radioValue4, setRadioValue4] = createSignal('c2');
  const [comboValue1, setComboValue1] = createSignal('option2');
  const [comboValue2, setComboValue2] = createSignal<string>();
  const [comboValue3, setComboValue3] = createSignal('circle');
  const [comboValue4, setComboValue4] = createSignal('medium');
  const [comboValue5, setComboValue5] = createSignal<string>();
  const [comboValue6, setComboValue6] = createSignal<string>();
  const [comboValue7, setComboValue7] = createSignal<string>();

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <GridBackground gridSize={10} />
      <div class="content" style={{ overflow: 'auto' }}>
        <div class="container grid">
          <h1>Design System Test Page</h1>

          <Card>
            <h2>Typography Examples</h2>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>

            <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>. Here's a <a href="#">link example</a>.</p>
            <p><small>This is small text for captions or footnotes.</small></p>

            <ul>
              <li>Unordered list item 1</li>
              <li>Unordered list item 2</li>
              <li>Unordered list item 3</li>
            </ul>

            <ol>
              <li>Ordered list item 1</li>
              <li>Ordered list item 2</li>
              <li>Ordered list item 3</li>
            </ol>

            <p>Inline code example: <code>const foo = 'bar';</code></p>

            <pre>{`function example() {
  console.log('Code block example');
  return true;
}`}</pre>

            <blockquote>
              This is a blockquote for highlighting important information or quotes.
            </blockquote>

            <hr />

            <div class="flex--sm flex--wrap">
              <span class="text-xs">Extra Small</span>
              <span class="text-sm">Small</span>
              <span class="text-base">Base</span>
              <span class="text-lg">Large</span>
              <span class="text-xl">XL</span>
            </div>
          </Card>

          <h2>Card Component Examples</h2>

          <Card>
            <CardHeader title="Default Card" subtitle="Basic card with default styling" />
            <p>This is a default card with normal padding.</p>
          </Card>

          <Card variant="emphasized">
            <CardHeader title="Emphasized Card" subtitle="Stands out more with primary border" />
            <p>This card has the emphasized variant.</p>
          </Card>

          <Card variant="subtle">
            <CardHeader title="Subtle Card" subtitle="More subdued appearance" />
            <p>This card has the subtle variant.</p>
          </Card>

          <Card interactive onClick={() => alert('Card clicked!')}>
            <CardHeader title="Interactive Card" subtitle="Click me!" />
            <p>This card has hover effects and is clickable.</p>
          </Card>

          <Card accent="primary">
            <CardHeader title="Primary Accent" subtitle="Left border accent" />
            <p>This card has a primary color accent on the left border.</p>
          </Card>

          <Card variant="emphasized" interactive accent="primary" padding="spacious">
            <CardHeader title="Combined Options" subtitle="Multiple props combined" />
            <p>This card combines emphasized variant, interactive hover, primary accent, and spacious padding.</p>
          </Card>

          <h2>Checkbox Component Examples</h2>

          <Card>
            <CardHeader title="Basic Checkboxes" />
            <div class="grid--sm">
              <Checkbox label="Unchecked checkbox" />
              <Checkbox label="Checked checkbox" checked />
              <Checkbox label="Disabled checkbox" disabled />
              <Checkbox label="Disabled checked" checked disabled />
            </div>
          </Card>

          <Card>
            <CardHeader title="Interactive Checkboxes" />
            <div class="grid--sm">
              <Checkbox
                label="Toggle me"
                checked={checked1()}
                onChange={(e) => setChecked1(e.currentTarget.checked)}
              />
              <Checkbox
                label="Toggle me too"
                checked={checked2()}
                onChange={(e) => setChecked2(e.currentTarget.checked)}
              />
              <p>
                <small>
                  Checkbox 1: {checked1() ? 'checked' : 'unchecked'} |
                  Checkbox 2: {checked2() ? 'checked' : 'unchecked'}
                </small>
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Indeterminate State" />
            <div class="grid--sm">
              <Checkbox label="Indeterminate checkbox" indeterminate />
              <Checkbox
                label="Toggle all states"
                checked={checked3()}
                indeterminate={checked3() === undefined}
                onChange={(e) => setChecked3(e.currentTarget.checked)}
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Compact Size" />
            <div class="grid--sm">
              <Checkbox label="Compact unchecked" size="compact" />
              <Checkbox label="Compact checked" size="compact" checked />
              <Checkbox label="Compact indeterminate" size="compact" indeterminate />
            </div>
          </Card>

          <Card>
            <CardHeader title="Without Labels" />
            <div class="flex--sm">
              <Checkbox />
              <Checkbox checked />
              <Checkbox indeterminate />
              <Checkbox size="compact" />
            </div>
          </Card>

          <Card>
            <CardHeader title="Icon Checkboxes" subtitle="Using solid-icons library" />
            <div class="grid--sm">
              <Checkbox label="Bookmark" iconUnchecked={BsBookmark} iconChecked={BsBookmarkFill} />
              <Checkbox label="Bookmark (checked)" iconUnchecked={BsBookmark} iconChecked={BsBookmarkFill} checked />
              <Checkbox label="Heart" iconUnchecked={BsHeart} iconChecked={BsHeartFill} />
              <Checkbox label="Heart (checked)" iconUnchecked={BsHeart} iconChecked={BsHeartFill} checked />
              <Checkbox label="Star" iconUnchecked={BsStar} iconChecked={BsStarFill} />
              <Checkbox label="Star (checked)" iconUnchecked={BsStar} iconChecked={BsStarFill} checked />
            </div>
          </Card>

          <Card>
            <CardHeader title="Icon Checkboxes - Compact" />
            <div class="grid--sm">
              <Checkbox label="Compact bookmark" iconUnchecked={BsBookmark} iconChecked={BsBookmarkFill} size="compact" />
              <Checkbox label="Compact heart" iconUnchecked={BsHeart} iconChecked={BsHeartFill} size="compact" checked />
              <Checkbox label="Compact star" iconUnchecked={BsStar} iconChecked={BsStarFill} size="compact" />
            </div>
          </Card>

          <Card>
            <CardHeader title="Icon Checkboxes - No Labels" />
            <div class="flex--sm">
              <Checkbox iconUnchecked={BsBookmark} iconChecked={BsBookmarkFill} />
              <Checkbox iconUnchecked={BsBookmark} iconChecked={BsBookmarkFill} checked />
              <Checkbox iconUnchecked={BsHeart} iconChecked={BsHeartFill} />
              <Checkbox iconUnchecked={BsHeart} iconChecked={BsHeartFill} checked />
              <Checkbox iconUnchecked={BsStar} iconChecked={BsStarFill} />
              <Checkbox iconUnchecked={BsStar} iconChecked={BsStarFill} checked />
            </div>
          </Card>

          <h2>Radio Group Examples</h2>

          <Card>
            <CardHeader title="Basic Radio Group" />
            <RadioGroup
              name="basic"
              value={radioValue1()}
              onChange={setRadioValue1}
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
                { value: 'option4', label: 'Option 4 (disabled)', disabled: true },
              ]}
            />
            <p><small>Selected: {radioValue1()}</small></p>
          </Card>

          <Card>
            <CardHeader title="Horizontal Orientation" />
            <RadioGroup
              name="color"
              value={radioValue2()}
              onChange={setRadioValue2}
              orientation="horizontal"
              options={[
                { value: 'red', label: 'Red' },
                { value: 'green', label: 'Green' },
                { value: 'blue', label: 'Blue' },
                { value: 'yellow', label: 'Yellow', disabled: true },
              ]}
            />
            <p><small>Selected: {radioValue2()}</small></p>
          </Card>

          <Card>
            <CardHeader title="Compact Size" />
            <RadioGroup
              name="compact"
              value={radioValue4()}
              onChange={setRadioValue4}
              size="compact"
              options={[
                { value: 'c1', label: 'Compact option 1' },
                { value: 'c2', label: 'Compact option 2' },
                { value: 'c3', label: 'Compact option 3' },
              ]}
            />
            <p><small>Selected: {radioValue4()}</small></p>
          </Card>

          <Card>
            <CardHeader title="Icon Radio Group" />
            <RadioGroup
              name="icon-rating"
              value={radioValue3()}
              onChange={setRadioValue3}
              options={[
                { value: 'bookmark', label: 'Bookmark', iconUnchecked: BsBookmark, iconChecked: BsBookmarkFill },
                { value: 'heart', label: 'Heart', iconUnchecked: BsHeart, iconChecked: BsHeartFill },
                { value: 'star', label: 'Star', iconUnchecked: BsStar, iconChecked: BsStarFill },
              ]}
            />
            <p><small>Selected: {radioValue3()}</small></p>
          </Card>

          <Card>
            <CardHeader title="Icon Radio Group - Horizontal & Compact" />
            <RadioGroup
              name="icon-horizontal"
              orientation="horizontal"
              size="compact"
              options={[
                { value: 'b1', label: 'Bookmark', iconUnchecked: BsBookmark, iconChecked: BsBookmarkFill },
                { value: 'h1', label: 'Heart', iconUnchecked: BsHeart, iconChecked: BsHeartFill },
                { value: 's1', label: 'Star', iconUnchecked: BsStar, iconChecked: BsStarFill },
              ]}
            />
          </Card>

          <h2>Combobox Examples</h2>

          <Card>
            <CardHeader title="Basic Combobox" />
            <Combobox
              value={comboValue1()}
              onChange={setComboValue1}
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
                { value: 'option4', label: 'Option 4' },
              ]}
            />
            <p><small>Selected: {comboValue1()}</small></p>
          </Card>

          <Card>
            <CardHeader title="With Placeholder" />
            <Combobox
              placeholder="Choose an option..."
              value={comboValue2()}
              onChange={setComboValue2}
              options={[
                { value: 'red', label: 'Red' },
                { value: 'green', label: 'Green' },
                { value: 'blue', label: 'Blue' },
              ]}
            />
            <p><small>Selected: {comboValue2() || 'None'}</small></p>
          </Card>

          <Card>
            <CardHeader title="Compact Size" />
            <Combobox
              size="compact"
              value={comboValue4()}
              onChange={setComboValue4}
              options={[
                { value: 'small', label: 'Small' },
                { value: 'medium', label: 'Medium' },
                { value: 'large', label: 'Large' },
              ]}
            />
            <p><small>Selected: {comboValue4()}</small></p>
          </Card>

          <Card>
            <CardHeader title="Disabled State" />
            <div class="grid--sm">
              <Combobox
                disabled
                value="option1"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                ]}
              />
              <Combobox
                disabled
                placeholder="Disabled with placeholder"
                options={[
                  { value: 'option1', label: 'Option 1' },
                ]}
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="With Icons" />
            <Combobox
              value={comboValue3()}
              onChange={setComboValue3}
              options={[
                { value: 'circle', label: 'Circle', icon: BsCircle },
                { value: 'square', label: 'Square', icon: BsSquare },
                { value: 'triangle', label: 'Triangle', icon: BsTriangle },
              ]}
            />
            <p><small>Selected: {comboValue3()}</small></p>
          </Card>

          <Card>
            <CardHeader title="With Disabled Options" />
            <Combobox
              placeholder="Select a shape..."
              value={comboValue5()}
              onChange={setComboValue5}
              options={[
                { value: 'star', label: 'Star', icon: BsStar },
                { value: 'heart', label: 'Heart', icon: BsHeart },
                { value: 'bookmark', label: 'Bookmark (disabled)', icon: BsBookmark, disabled: true },
                { value: 'circle', label: 'Circle', icon: BsCircle },
              ]}
            />
            <p><small>Selected: {comboValue5() || 'None'}</small></p>
          </Card>

          <Card>
            <CardHeader title="Long List" />
            <Combobox
              placeholder="Select a number..."
              value={comboValue6()}
              onChange={setComboValue6}
              options={[
                { value: '1', label: 'One' },
                { value: '2', label: 'Two' },
                { value: '3', label: 'Three' },
                { value: '4', label: 'Four' },
                { value: '5', label: 'Five' },
                { value: '6', label: 'Six' },
                { value: '7', label: 'Seven' },
                { value: '8', label: 'Eight' },
                { value: '9', label: 'Nine' },
                { value: '10', label: 'Ten' },
              ]}
            />
            <p><small>Selected: {comboValue6() || 'None'}</small></p>
          </Card>

          <Card>
            <CardHeader title="Mixed Short & Long Options" subtitle="Testing text overflow" />
            <Combobox
              placeholder="Select an option..."
              value={comboValue7()}
              onChange={setComboValue7}
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'long1', label: 'This is a very long option text that might get cut off if not handled properly' },
                { value: 'maybe', label: 'Maybe' },
                { value: 'long2', label: 'Another extremely long option label to test text overflow and wrapping behavior' },
                { value: 'ok', label: 'OK' },
              ]}
            />
            <p><small>Selected: {comboValue7() || 'None'}</small></p>
          </Card>

          <h2>Button Component Examples</h2>

          <Card>
            <CardHeader title="Button Variants" />
            <div class="flex--sm flex--wrap">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="subtle">Subtle Button</Button>
              <Button variant="danger">Danger Button</Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Button Sizes" />
            <div class="flex--sm flex--wrap">
              <Button size="compact">Compact</Button>
              <Button size="normal">Normal</Button>
              <Button size="spacious">Spacious</Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Disabled Buttons" />
            <div class="flex--sm flex--wrap">
              <Button variant="primary" disabled>Disabled Primary</Button>
              <Button variant="secondary" disabled>Disabled Secondary</Button>
              <Button variant="subtle" disabled>Disabled Subtle</Button>
              <Button variant="danger" disabled>Disabled Danger</Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Loading State" />
            <div class="flex--sm flex--wrap">
              <Button variant="primary" loading={loading()} onClick={handleLoadingClick}>
                {loading() ? 'Loading...' : 'Click me'}
              </Button>
              <Button variant="secondary" loading>Loading Secondary</Button>
              <Button variant="subtle" loading>Loading Subtle</Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Size + Variant Combinations" />
            <div class="grid--sm">
              <div class="flex--sm flex--wrap">
                <Button variant="primary" size="compact">Compact Primary</Button>
                <Button variant="secondary" size="compact">Compact Secondary</Button>
                <Button variant="subtle" size="compact">Compact Subtle</Button>
              </div>
              <div class="flex--sm flex--wrap">
                <Button variant="primary" size="spacious">Spacious Primary</Button>
                <Button variant="secondary" size="spacious">Spacious Secondary</Button>
                <Button variant="subtle" size="spacious">Spacious Subtle</Button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Interactive Example" />
            <div class="flex--sm flex--wrap">
              <Button onClick={() => alert('Primary clicked!')}>Click me</Button>
              <Button variant="secondary" onClick={() => console.log('Secondary clicked')}>
                Log to console
              </Button>
              <Button variant="danger" onClick={() => confirm('Are you sure?')}>
                Confirm action
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Icon-Only Buttons" />
            <div class="flex--sm flex--wrap">
              <Button variant="primary" icon={BsPlus} />
              <Button variant="secondary" icon={BsPencil} />
              <Button variant="subtle" icon={BsGear} />
              <Button variant="danger" icon={BsTrash} />
            </div>
          </Card>

          <Card>
            <CardHeader title="Buttons with Icons" />
            <div class="grid--sm">
              <div class="flex--sm flex--wrap">
                <Button variant="primary" icon={BsPlus}>Add Item</Button>
                <Button variant="secondary" icon={BsDownload}>Download</Button>
                <Button variant="subtle" icon={BsUpload}>Upload</Button>
              </div>
              <div class="flex--sm flex--wrap">
                <Button variant="primary" icon={BsPlus} iconPosition="right">Add Item</Button>
                <Button variant="secondary" icon={BsDownload} iconPosition="right">Download</Button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Icon Button Sizes" />
            <div class="flex--sm flex--wrap">
              <Button size="compact" icon={BsPlus} />
              <Button size="normal" icon={BsPlus} />
              <Button size="spacious" icon={BsPlus} />
            </div>
          </Card>

          <Card>
            <CardHeader title="Icon Buttons - Loading State" />
            <div class="flex--sm flex--wrap">
              <Button variant="primary" icon={BsPlus} loading>Add</Button>
              <Button variant="secondary" icon={BsDownload} loading>Download</Button>
              <Button variant="primary" icon={BsPlus} loading />
            </div>
          </Card>

          <h2>ButtonGroup Component Examples</h2>

          <Card>
            <CardHeader title="Horizontal Button Groups" />
            <div class="grid--sm">
              <ButtonGroup>
                <Button variant="primary">Left</Button>
                <Button variant="primary">Middle</Button>
                <Button variant="primary">Right</Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button variant="secondary">One</Button>
                <Button variant="secondary">Two</Button>
                <Button variant="secondary">Three</Button>
                <Button variant="secondary">Four</Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button variant="subtle">First</Button>
                <Button variant="subtle">Second</Button>
              </ButtonGroup>
            </div>
          </Card>

          <Card>
            <CardHeader title="Vertical Button Groups" />
            <div class="flex--sm flex--wrap">
              <ButtonGroup orientation="vertical">
                <Button variant="primary">Top</Button>
                <Button variant="primary">Middle</Button>
                <Button variant="primary">Bottom</Button>
              </ButtonGroup>

              <ButtonGroup orientation="vertical">
                <Button variant="secondary">Option 1</Button>
                <Button variant="secondary">Option 2</Button>
                <Button variant="secondary">Option 3</Button>
              </ButtonGroup>
            </div>
          </Card>

          <Card>
            <CardHeader title="Mixed Variants in Group" />
            <div class="grid--sm">
              <ButtonGroup>
                <Button variant="primary">Save</Button>
                <Button variant="secondary">Cancel</Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button variant="secondary">Edit</Button>
                <Button variant="secondary">Copy</Button>
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
            </div>
          </Card>

          <Card>
            <CardHeader title="Button Group Sizes" />
            <div class="grid--sm">
              <ButtonGroup>
                <Button size="compact">Small</Button>
                <Button size="compact">Group</Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button size="spacious">Large</Button>
                <Button size="spacious">Group</Button>
              </ButtonGroup>
            </div>
          </Card>

          <Card>
            <CardHeader title="Single Button in Group" />
            <div class="flex--sm flex--wrap">
              <ButtonGroup>
                <Button variant="primary">Single</Button>
              </ButtonGroup>
            </div>
          </Card>

          <h2>Spinner Component Examples</h2>

          <Card>
            <CardHeader title="Spinner Sizes" />
            <div class="flex--sm flex--wrap">
              <Spinner size="sm" />
              <Spinner size="normal" />
              <Spinner size="lg" />
            </div>
          </Card>

          <Card>
            <CardHeader title="Colored Spinners" />
            <div class="flex--sm flex--wrap">
              <Spinner class="text-primary" />
              <Spinner class="text-accent" />
              <Spinner class="text-muted" />
              <span style={{ color: 'var(--color-danger)' }}>
                <Spinner />
              </span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Test;
