import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { GridBackground } from '../../components/surfaces/GridBackground';
import { Card, CardHeader } from '../../components/surfaces/Card';
import { Checkbox } from '../../components/inputs/Checkbox';
import { RadioGroup } from '../../components/inputs/RadioGroup';
import { Combobox } from '../../components/inputs/Combobox';
import { Slider } from '../../components/inputs/Slider';
import { TextField } from '../../components/inputs/TextField';
import { Button } from '../../components/inputs/Button';
import { ButtonGroup } from '../../components/inputs/ButtonGroup';
import { Spinner } from '../../components/inputs/Spinner';
import { Dialog, DialogHeader, DialogFooter } from '../../components/feedback/Dialog';
import { useNotification } from '../../components/feedback/Notification';
import { Tooltip } from '../../components/display/Tooltip';
import { Badge } from '../../components/display/Badge';
import { getCSSVariable } from '../../utils/cssVariables';
import { BsBookmark, BsBookmarkFill, BsHeart, BsHeartFill, BsStar, BsStarFill, BsPlus, BsTrash, BsPencil, BsDownload, BsUpload, BsGear, BsCircle, BsCircleFill, BsSquare, BsTriangle, BsSearch, BsEnvelope, BsInfoCircle, BsQuestionCircle, BsCheck, BsBell, BsFire, BsLightning } from 'solid-icons/bs';

const Test: Component = () => {
  const { notify } = useNotification();
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
  const [comboMulti1, setComboMulti1] = createSignal<string[]>(['option2']);
  const [comboMulti2, setComboMulti2] = createSignal<string[]>([]);
  const [comboMulti3, setComboMulti3] = createSignal<string[]>(['star', 'heart']);
  const [sliderValue1, setSliderValue1] = createSignal(50);
  const [sliderValue2, setSliderValue2] = createSignal(25);
  const [sliderValue3, setSliderValue3] = createSignal<[number, number]>([25, 75]);
  const [sliderValue4, setSliderValue4] = createSignal<[number, number]>([20, 80]);
  const [sliderValue5, setSliderValue5] = createSignal(50);
  const [textValue1, setTextValue1] = createSignal('');
  const [textValue2, setTextValue2] = createSignal('John Doe');
  const [textValue3, setTextValue3] = createSignal('');
  const [textValue4, setTextValue4] = createSignal('');
  const [textValue5, setTextValue5] = createSignal('example@email.com');
  const [textValue6, setTextValue6] = createSignal('');
  const [textValue7, setTextValue7] = createSignal('Short text');
  const [textValue8, setTextValue8] = createSignal('');
  const [textValue9, setTextValue9] = createSignal('');
  const [multilineValue1, setMultilineValue1] = createSignal('');
  const [multilineValue2, setMultilineValue2] = createSignal('This is a textarea that automatically grows as you type more content. Try adding several lines of text to see it expand!');
  const [multilineValue3, setMultilineValue3] = createSignal('');
  const [currency, setCurrency] = createSignal('usd');
  const [protocol, setProtocol] = createSignal('https');
  const [dialogOpen1, setDialogOpen1] = createSignal(false);
  const [dialogOpen2, setDialogOpen2] = createSignal(false);
  const [dialogOpen3, setDialogOpen3] = createSignal(false);
  const [dialogOpen4, setDialogOpen4] = createSignal(false);
  const [dialogOpen5, setDialogOpen5] = createSignal(false);
  const [dialogOpen6, setDialogOpen6] = createSignal(false);

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

          <h2>TextField Component Examples</h2>

          <Card>
            <CardHeader title="Basic TextField" />
            <div class="grid--sm">
              <TextField
                placeholder="Enter text..."
                value={textValue1()}
                onChange={setTextValue1}
              />
              <p><small>Value: {textValue1() || '(empty)'}</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="With Label" />
            <div class="grid--sm">
              <TextField
                label="Username"
                placeholder="Enter your username"
                value={textValue2()}
                onChange={setTextValue2}
              />
              <p><small>Value: {textValue2()}</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Disabled State" />
            <TextField
              label="Disabled"
              value="Cannot edit this"
              disabled
            />
          </Card>

          <Card>
            <CardHeader title="Compact Size" />
            <div class="grid--sm">
              <TextField
                size="compact"
                label="Compact TextField"
                placeholder="Smaller size"
                value={textValue4()}
                onChange={setTextValue4}
              />
              <p><small>Value: {textValue4() || '(empty)'}</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="With Character Count" />
            <div class="grid--sm">
              <TextField
                label="Bio"
                placeholder="Tell us about yourself"
                maxLength={100}
                showCount
                value={textValue3()}
                onChange={setTextValue3}
              />
              <p><small>Characters: {textValue3().length}/100</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Clearable TextField" />
            <div class="grid--sm">
              <TextField
                label="Search Query"
                placeholder="Type to search..."
                clearable
                value={textValue5()}
                onChange={setTextValue5}
              />
              <p><small>Value: {textValue5() || '(empty)'}</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="With Prefix and Suffix" />
            <div class="grid--sm">
              <TextField
                label="Price"
                placeholder="0.00"
                prefix="$"
                suffix="USD"
              />
              <TextField
                label="Weight"
                placeholder="Enter weight"
                suffix="kg"
              />
              <TextField
                label="Website"
                placeholder="example.com"
                prefix="https://"
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="With Icon Prefix/Suffix" />
            <div class="grid--sm">
              <TextField
                label="Search"
                placeholder="Search..."
                prefix={<BsSearch />}
              />
              <TextField
                label="Email"
                type="email"
                placeholder="your@email.com"
                suffix={<BsEnvelope />}
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Different Input Types" />
            <div class="grid--sm">
              <TextField
                label="Text"
                type="text"
                placeholder="Regular text input"
              />
              <TextField
                label="Password"
                type="password"
                placeholder="Enter password"
              />
              <TextField
                label="Email"
                type="email"
                placeholder="you@example.com"
              />
              <TextField
                label="Number"
                type="number"
                placeholder="123"
              />
              <TextField
                label="Phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
              />
              <TextField
                label="URL"
                type="url"
                placeholder="https://example.com"
              />
              <TextField
                label="Search"
                type="search"
                placeholder="Search..."
              />
            </div>
          </Card>

          <Card>
            <CardHeader title="Combined Features" />
            <div class="grid--sm">
              <TextField
                label="Bio"
                placeholder="Tell us about yourself..."
                maxLength={50}
                showCount
                clearable
                value={textValue6()}
                onChange={setTextValue6}
              />
              <p><small>Value: {textValue6() || '(empty)'}</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Max Length Test" subtitle="Try typing more than 20 characters" />
            <div class="grid--sm">
              <TextField
                label="Limited Input"
                placeholder="Max 20 characters"
                maxLength={20}
                showCount
                clearable
                value={textValue7()}
                onChange={setTextValue7}
              />
              <p><small>Value: "{textValue7()}" ({textValue7().length} chars)</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="With Selectable Suffix" subtitle="Combobox for currency selection" />
            <div class="grid--sm">
              <TextField
                label="Price"
                type="number"
                placeholder="0.00"
                value={textValue8()}
                onChange={setTextValue8}
                suffix={
                  <Combobox
                    size="compact"
                    value={currency()}
                    onChange={setCurrency}
                    options={[
                      { value: 'usd', label: 'USD' },
                      { value: 'aud', label: 'AUD' },
                      { value: 'eur', label: 'EUR' },
                      { value: 'gbp', label: 'GBP' },
                      { value: 'jpy', label: 'JPY' },
                    ]}
                  />
                }
              />
              <p><small>Price: {textValue8() || '0'} {currency().toUpperCase()}</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="With Selectable Prefix" subtitle="Combobox for protocol selection" />
            <div class="grid--sm">
              <TextField
                label="Website URL"
                placeholder="example.com"
                value={textValue9()}
                onChange={setTextValue9}
                prefix={
                  <Combobox
                    size="compact"
                    value={protocol()}
                    onChange={setProtocol}
                    options={[
                      { value: 'https', label: 'https://' },
                      { value: 'http', label: 'http://' },
                    ]}
                  />
                }
              />
              <p><small>Full URL: {protocol()}://{textValue9() || 'example.com'}</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Multi-Line TextField" subtitle="Basic textarea" />
            <div class="grid--sm">
              <TextField
                label="Comments"
                multiline
                placeholder="Enter your comments..."
                value={multilineValue1()}
                onChange={setMultilineValue1}
              />
              <p><small>Lines: {(multilineValue1().match(/\n/g) || []).length + 1}</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Auto-Growing Textarea" subtitle="Grows from 3 to 10 rows" />
            <div class="grid--sm">
              <TextField
                label="Description"
                multiline
                rows={3}
                maxRows={10}
                placeholder="Start typing to see it grow..."
                value={multilineValue2()}
                onChange={setMultilineValue2}
                clearable
              />
              <p><small>Characters: {multilineValue2().length}</small></p>
            </div>
          </Card>

          <Card>
            <CardHeader title="Multi-Line with Character Limit" />
            <div class="grid--sm">
              <TextField
                label="Bio"
                multiline
                rows={4}
                maxRows={6}
                maxLength={200}
                showCount
                placeholder="Write a short bio..."
                value={multilineValue3()}
                onChange={setMultilineValue3}
              />
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

          <h2>Multi-Select Combobox Examples</h2>

          <Card>
            <CardHeader title="Basic Multi-Select" />
            <Combobox
              multiple
              value={comboMulti1()}
              onChange={setComboMulti1}
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
                { value: 'option4', label: 'Option 4' },
              ]}
            />
            <p><small>Selected: {comboMulti1().join(', ') || 'None'}</small></p>
          </Card>

          <Card>
            <CardHeader title="Multi-Select with Placeholder" />
            <Combobox
              multiple
              placeholder="Select multiple colors..."
              value={comboMulti2()}
              onChange={setComboMulti2}
              options={[
                { value: 'red', label: 'Red' },
                { value: 'green', label: 'Green' },
                { value: 'blue', label: 'Blue' },
                { value: 'yellow', label: 'Yellow' },
                { value: 'purple', label: 'Purple' },
              ]}
            />
            <p><small>Selected: {comboMulti2().join(', ') || 'None'}</small></p>
          </Card>

          <Card>
            <CardHeader title="Multi-Select with Icons" />
            <Combobox
              multiple
              placeholder="Select favorites..."
              value={comboMulti3()}
              onChange={setComboMulti3}
              options={[
                { value: 'star', label: 'Star', iconUnchecked: BsStar, iconChecked: BsStarFill },
                { value: 'heart', label: 'Heart', iconUnchecked: BsHeart, iconChecked: BsHeartFill },
                { value: 'bookmark', label: 'Bookmark', iconUnchecked: BsBookmark, iconChecked: BsBookmarkFill },
                { value: 'circle', label: 'Circle', iconUnchecked: BsCircle, iconChecked: BsCircleFill },
              ]}
            />
            <p><small>Selected: {comboMulti3().join(', ') || 'None'}</small></p>
          </Card>

          <h2>Slider Component Examples</h2>

          <Card>
            <CardHeader title="Basic Slider" />
            <Slider
              value={sliderValue1()}
              onChange={setSliderValue1}
              min={0}
              max={100}
            />
            <p><small>Value: {sliderValue1()}</small></p>
          </Card>

          <Card>
            <CardHeader title="Slider with Step" />
            <Slider
              value={sliderValue2()}
              onChange={setSliderValue2}
              min={0}
              max={100}
              step={10}
            />
            <p><small>Value: {sliderValue2()}</small></p>
          </Card>

          <Card>
            <CardHeader title="Range Slider" />
            <Slider
              range
              value={sliderValue3()}
              onChange={setSliderValue3}
              min={0}
              max={100}
            />
            <p><small>Range: {sliderValue3()[0]} - {sliderValue3()[1]}</small></p>
          </Card>

          <Card>
            <CardHeader title="Compact Size" />
            <Slider
              size="compact"
              range
              value={sliderValue4()}
              onChange={setSliderValue4}
              min={0}
              max={100}
            />
            <p><small>Range: {sliderValue4()[0]} - {sliderValue4()[1]}</small></p>
          </Card>

          <Card>
            <CardHeader title="Disabled State" />
            <Slider
              disabled
              value={sliderValue5()}
              min={0}
              max={100}
            />
            <p><small>Value: {sliderValue5()}</small></p>
          </Card>

          <Card>
            <CardHeader title="Vertical Orientation" />
            <Slider
              orientation="vertical"
              value={sliderValue1()}
              onChange={setSliderValue1}
              min={0}
              max={100}
            />
            <p><small>Value: {sliderValue1()}</small></p>
          </Card>

          <Card>
            <CardHeader title="With Marks" />
            <Slider
              value={sliderValue1()}
              onChange={setSliderValue1}
              min={0}
              max={100}
              step={25}
              marks={[
                { value: 0, label: '0%' },
                { value: 25, label: '25%' },
                { value: 50, label: '50%' },
                { value: 75, label: '75%' },
                { value: 100, label: '100%' },
              ]}
            />
            <p><small>Value: {sliderValue1()}</small></p>
          </Card>

          <Card>
            <CardHeader title="With Tooltip (drag to see)" />
            <Slider
              value={sliderValue2()}
              onChange={setSliderValue2}
              min={0}
              max={100}
              showTooltip
            />
            <p><small>Value: {sliderValue2()}</small></p>
          </Card>

          <Card>
            <CardHeader title="Restricted to Marks" subtitle="step={null} - only snaps to marked values" />
            <Slider
              value={sliderValue2()}
              onChange={setSliderValue2}
              min={0}
              max={100}
              step={null}
              marks={[
                { value: 0, label: 'Low' },
                { value: 33, label: 'Medium' },
                { value: 66, label: 'High' },
                { value: 100, label: 'Max' },
              ]}
              showTooltip
            />
            <p><small>Value: {sliderValue2()}</small></p>
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

          <h2>Dialog Component Examples</h2>

          <Card>
            <CardHeader title="Basic Dialog" />
            <div class="flex--sm">
              <Button onClick={() => setDialogOpen1(true)}>Open Basic Dialog</Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Dialog Sizes" />
            <div class="flex--sm flex--wrap">
              <Button onClick={() => setDialogOpen2(true)}>Small Dialog</Button>
              <Button onClick={() => setDialogOpen3(true)}>Medium Dialog</Button>
              <Button onClick={() => setDialogOpen4(true)}>Large Dialog</Button>
              <Button onClick={() => setDialogOpen5(true)}>Full Screen Dialog</Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Dialog with Form" />
            <div class="flex--sm">
              <Button onClick={() => setDialogOpen6(true)}>Open Form Dialog</Button>
            </div>
          </Card>

          {/* Dialog instances */}
          <Dialog open={dialogOpen1()} onClose={() => setDialogOpen1(false)}>
            <DialogHeader
              title="Basic Dialog"
              subtitle="This is a simple dialog example"
              onClose={() => setDialogOpen1(false)}
            />
            <p>This is the dialog content. You can put any content here.</p>
            <p>Click outside, press ESC, or click the X button to close.</p>
            <DialogFooter>
              <Button variant="subtle" onClick={() => setDialogOpen1(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setDialogOpen1(false)}>Confirm</Button>
            </DialogFooter>
          </Dialog>

          <Dialog open={dialogOpen2()} onClose={() => setDialogOpen2(false)} size="small">
            <DialogHeader
              title="Small Dialog"
              subtitle="This dialog has a smaller width"
              onClose={() => setDialogOpen2(false)}
            />
            <p>This is a small dialog, perfect for simple confirmations or alerts.</p>
            <DialogFooter>
              <Button variant="subtle" onClick={() => setDialogOpen2(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setDialogOpen2(false)}>OK</Button>
            </DialogFooter>
          </Dialog>

          <Dialog open={dialogOpen3()} onClose={() => setDialogOpen3(false)} size="medium">
            <DialogHeader
              title="Medium Dialog"
              subtitle="This is the default size"
              onClose={() => setDialogOpen3(false)}
            />
            <p>This is a medium dialog, the default size. It's suitable for most use cases.</p>
            <p>You can include multiple paragraphs or components here.</p>
            <DialogFooter>
              <Button variant="subtle" onClick={() => setDialogOpen3(false)}>Close</Button>
            </DialogFooter>
          </Dialog>

          <Dialog open={dialogOpen4()} onClose={() => setDialogOpen4(false)} size="large">
            <DialogHeader
              title="Large Dialog"
              subtitle="This dialog has more space for content"
              onClose={() => setDialogOpen4(false)}
            />
            <p>This is a large dialog with more horizontal space for complex content.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <DialogFooter>
              <Button variant="danger" onClick={() => setDialogOpen4(false)}>Delete</Button>
              <Button variant="subtle" onClick={() => setDialogOpen4(false)}>Cancel</Button>
            </DialogFooter>
          </Dialog>

          <Dialog open={dialogOpen5()} onClose={() => setDialogOpen5(false)} size="fullscreen">
            <DialogHeader
              title="Full Screen Dialog"
              subtitle="This dialog takes up the entire viewport"
              onClose={() => setDialogOpen5(false)}
            />
            <p>This is a full-screen dialog that maximizes the available space.</p>
            <p>Perfect for complex forms or detailed content that needs more room.</p>
            <div class="grid--sm" style={{ "margin-top": "var(--g-spacing)" }}>
              <Card variant="subtle">
                <h3>Section 1</h3>
                <p>Content goes here...</p>
              </Card>
              <Card variant="subtle">
                <h3>Section 2</h3>
                <p>More content...</p>
              </Card>
            </div>
            <DialogFooter>
              <Button variant="subtle" onClick={() => setDialogOpen5(false)}>Close</Button>
            </DialogFooter>
          </Dialog>

          <Dialog open={dialogOpen6()} onClose={() => setDialogOpen6(false)}>
            <DialogHeader
              title="User Information"
              subtitle="Please fill out the form below"
              onClose={() => setDialogOpen6(false)}
            />
            <div class="grid--sm">
              <TextField
                label="Full Name"
                placeholder="Enter your name"
              />
              <TextField
                type="email"
                label="Email Address"
                placeholder="Enter your email"
              />
              <TextField
                type="tel"
                label="Phone Number"
                placeholder="(555) 123-4567"
              />
              <TextField
                multiline
                label="Message"
                placeholder="Enter your message"
                rows={4}
              />
            </div>
            <DialogFooter>
              <Button variant="subtle" onClick={() => setDialogOpen6(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setDialogOpen6(false)}>Submit</Button>
            </DialogFooter>
          </Dialog>

          <h2>Notification Component Examples</h2>

          <Card>
            <CardHeader title="Notification Variants" />
            <div class="flex--sm flex--wrap">
              <Button
                variant="primary"
                onClick={() => notify({
                  variant: 'success',
                  title: 'Success!',
                  message: 'Your changes have been saved successfully.',
                })}
              >
                Show Success
              </Button>
              <Button
                variant="secondary"
                onClick={() => notify({
                  variant: 'error',
                  title: 'Error',
                  message: 'Something went wrong. Please try again.',
                })}
              >
                Show Error
              </Button>
              <Button
                variant="secondary"
                onClick={() => notify({
                  variant: 'warning',
                  title: 'Warning',
                  message: 'This action cannot be undone.',
                })}
              >
                Show Warning
              </Button>
              <Button
                variant="secondary"
                onClick={() => notify({
                  variant: 'info',
                  title: 'Information',
                  message: 'This is an informational message.',
                })}
              >
                Show Info
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Notification Positions" />
            <div class="flex--sm flex--wrap">
              <Button
                onClick={() => notify({
                  variant: 'info',
                  title: 'Top Right',
                  message: 'This notification appears in the top-right corner.',
                  position: 'top-right',
                })}
              >
                Top Right
              </Button>
              <Button
                onClick={() => notify({
                  variant: 'info',
                  title: 'Top Center',
                  message: 'This notification appears at the top-center.',
                  position: 'top-center',
                })}
              >
                Top Center
              </Button>
              <Button
                onClick={() => notify({
                  variant: 'info',
                  title: 'Bottom Right',
                  message: 'This notification appears in the bottom-right corner.',
                  position: 'bottom-right',
                })}
              >
                Bottom Right
              </Button>
              <Button
                onClick={() => notify({
                  variant: 'info',
                  title: 'Bottom Center',
                  message: 'This notification appears at the bottom-center.',
                  position: 'bottom-center',
                })}
              >
                Bottom Center
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Persistent Notification" />
            <div class="flex--sm flex--wrap">
              <Button
                onClick={() => notify({
                  variant: 'warning',
                  title: 'Persistent',
                  message: 'This notification will not auto-dismiss. Click the X to close.',
                  duration: null,
                })}
              >
                Show Persistent
              </Button>
              <Button
                onClick={() => notify({
                  variant: 'success',
                  title: 'Quick (2s)',
                  message: 'This will auto-dismiss in 2 seconds.',
                  duration: 2000,
                })}
              >
                Quick Dismiss
              </Button>
              <Button
                onClick={() => notify({
                  variant: 'info',
                  title: 'Long (10s)',
                  message: 'This will auto-dismiss in 10 seconds.',
                  duration: 10000,
                })}
              >
                Long Dismiss
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Notifications with Actions" />
            <div class="flex--sm flex--wrap">
              <Button
                onClick={() => notify({
                  variant: 'info',
                  title: 'Update Available',
                  message: 'A new version is available. Would you like to update?',
                  duration: null,
                  actions: [
                    {
                      label: 'Update Now',
                      onClick: () => console.log('Update clicked'),
                    },
                    {
                      label: 'Later',
                      onClick: () => console.log('Later clicked'),
                    },
                  ],
                })}
              >
                Update Notification
              </Button>
              <Button
                onClick={() => notify({
                  variant: 'success',
                  title: 'File Uploaded',
                  message: 'Your file has been uploaded successfully.',
                  actions: [
                    {
                      label: 'View',
                      onClick: () => console.log('View clicked'),
                    },
                  ],
                })}
              >
                With Single Action
              </Button>
              <Button
                onClick={() => notify({
                  variant: 'error',
                  title: 'Connection Lost',
                  message: 'Your connection was interrupted.',
                  duration: null,
                  actions: [
                    {
                      label: 'Retry',
                      onClick: () => console.log('Retry clicked'),
                    },
                    {
                      label: 'Cancel',
                      onClick: () => console.log('Cancel clicked'),
                    },
                  ],
                })}
              >
                Error with Actions
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Multiple Notifications" />
            <div class="flex--sm flex--wrap">
              <Button
                onClick={() => {
                  notify({ variant: 'success', title: 'First notification', message: 'This is the first one.' });
                  setTimeout(() => notify({ variant: 'info', title: 'Second notification', message: 'This is the second one.' }), 300);
                  setTimeout(() => notify({ variant: 'warning', title: 'Third notification', message: 'This is the third one.' }), 600);
                }}
              >
                Show Multiple
              </Button>
              <Button
                onClick={() => {
                  for (let i = 1; i <= 5; i++) {
                    setTimeout(() => {
                      notify({
                        variant: ['success', 'error', 'warning', 'info'][i % 4] as any,
                        title: `Notification ${i}`,
                        message: `This is notification number ${i}.`,
                      });
                    }, i * 200);
                  }
                }}
              >
                Show Stack
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader title="Simple Notifications" />
            <div class="flex--sm flex--wrap">
              <Button
                onClick={() => notify({
                  variant: 'success',
                  title: 'Saved!',
                })}
              >
                Title Only
              </Button>
              <Button
                onClick={() => notify({
                  variant: 'error',
                  title: 'Failed',
                  duration: 3000,
                })}
              >
                Short Duration
              </Button>
            </div>
          </Card>

          <h2>Tooltip Component Examples</h2>

          <Card>
            <CardHeader title="Basic Tooltips" />
            <div class="flex--sm flex--wrap">
              <Tooltip content="This is a tooltip">
                <Button variant="secondary">Hover me</Button>
              </Tooltip>
              <Tooltip content="Tooltips work on any element">
                <Button variant="primary">Hover me too</Button>
              </Tooltip>
              <Tooltip content="You can also focus me with Tab key">
                <Button variant="subtle">Focus me</Button>
              </Tooltip>
            </div>
          </Card>

          <Card>
            <CardHeader title="Tooltip Placements" subtitle="Hover to see different positions" />
            <div class="flex--sm flex--wrap">
              <Tooltip content="Top placement (default)" placement="top">
                <Button variant="secondary">Top</Button>
              </Tooltip>
              <Tooltip content="Bottom placement" placement="bottom">
                <Button variant="secondary">Bottom</Button>
              </Tooltip>
              <Tooltip content="Left placement" placement="left">
                <Button variant="secondary">Left</Button>
              </Tooltip>
              <Tooltip content="Right placement" placement="right">
                <Button variant="secondary">Right</Button>
              </Tooltip>
            </div>
          </Card>

          <Card>
            <CardHeader title="Auto-Flip Behavior" subtitle="Try hovering near screen edges" />
            <div style={{ display: 'flex', 'justify-content': 'space-between', 'align-items': 'center', padding: 'var(--g-spacing)' }}>
              <Tooltip content="This tooltip will flip to the right if there's not enough space on the left" placement="left">
                <Button variant="secondary">Left edge</Button>
              </Tooltip>
              <Tooltip content="This tooltip will flip to the left if there's not enough space on the right" placement="right">
                <Button variant="secondary">Right edge</Button>
              </Tooltip>
            </div>
          </Card>

          <Card>
            <CardHeader title="Size Variants" />
            <div class="flex--sm flex--wrap">
              <Tooltip content="Normal sized tooltip with regular text" size="normal">
                <Button variant="secondary">Normal size</Button>
              </Tooltip>
              <Tooltip content="Compact sized tooltip" size="compact">
                <Button variant="secondary">Compact size</Button>
              </Tooltip>
            </div>
          </Card>

          <Card>
            <CardHeader title="Disabled Tooltips" />
            <div class="flex--sm flex--wrap">
              <Tooltip content="This tooltip is disabled" disabled>
                <Button variant="secondary">Disabled tooltip</Button>
              </Tooltip>
              <Tooltip content="This tooltip is enabled">
                <Button variant="secondary">Enabled tooltip</Button>
              </Tooltip>
              <Tooltip content="Tooltip on disabled button">
                <Button variant="secondary" disabled>Disabled button</Button>
              </Tooltip>
            </div>
          </Card>

          <Card>
            <CardHeader title="Rich Content Tooltips" />
            <div class="flex--sm flex--wrap">
              <Tooltip content={<div><strong>Bold</strong> and <em>italic</em> text</div>}>
                <Button variant="secondary">Rich content</Button>
              </Tooltip>
              <Tooltip content={
                <div>
                  <div><strong>User Settings</strong></div>
                  <div style={{ "margin-top": "4px", "font-size": "12px", opacity: 0.8 }}>
                    Configure your preferences
                  </div>
                </div>
              }>
                <Button variant="secondary" icon={BsGear}>Settings</Button>
              </Tooltip>
            </div>
          </Card>

          <Card>
            <CardHeader title="Tooltips on Different Elements" />
            <div class="flex--sm flex--wrap">
              <Tooltip content="Tooltip on primary button">
                <Button variant="primary" icon={BsPlus}>Add Item</Button>
              </Tooltip>
              <Tooltip content="Delete this item">
                <Button variant="danger" icon={BsTrash} />
              </Tooltip>
              <Tooltip content="Edit settings">
                <Button variant="subtle" icon={BsPencil} />
              </Tooltip>
            </div>
          </Card>

          <Card>
            <CardHeader title="Icon Buttons with Tooltips" subtitle="Useful for explaining icon-only buttons" />
            <div class="flex--sm flex--wrap">
              <Tooltip content="Add new item">
                <Button variant="primary" icon={BsPlus} size="compact" />
              </Tooltip>
              <Tooltip content="Download file">
                <Button variant="secondary" icon={BsDownload} size="compact" />
              </Tooltip>
              <Tooltip content="Upload file">
                <Button variant="secondary" icon={BsUpload} size="compact" />
              </Tooltip>
              <Tooltip content="Edit content">
                <Button variant="subtle" icon={BsPencil} size="compact" />
              </Tooltip>
              <Tooltip content="Delete permanently">
                <Button variant="danger" icon={BsTrash} size="compact" />
              </Tooltip>
              <Tooltip content="Open settings">
                <Button variant="subtle" icon={BsGear} size="compact" />
              </Tooltip>
            </div>
          </Card>

          <Card>
            <CardHeader title="Tooltips with Checkboxes" />
            <div class="grid--sm">
              <Tooltip content="Save this item to your favorites" placement="right">
                <Checkbox label="Favorite" iconUnchecked={BsStar} iconChecked={BsStarFill} />
              </Tooltip>
              <Tooltip content="Add this to your bookmarks" placement="right">
                <Checkbox label="Bookmark" iconUnchecked={BsBookmark} iconChecked={BsBookmarkFill} />
              </Tooltip>
              <Tooltip content="Like this content">
                <Checkbox label="Like" iconUnchecked={BsHeart} iconChecked={BsHeartFill} />
              </Tooltip>
            </div>
          </Card>

          <Card>
            <CardHeader title="Informational Tooltips" subtitle="Using icons to indicate help text" />
            <div class="grid--sm">
              <div style={{ display: 'flex', 'align-items': 'center', gap: 'var(--g-spacing-sm)' }}>
                <span>Username</span>
                <Tooltip content="Your username must be unique and between 3-20 characters" placement="right">
                  <span style={{ cursor: 'help', color: 'var(--g-text-secondary)' }}>
                    <BsQuestionCircle />
                  </span>
                </Tooltip>
              </div>
              <div style={{ display: 'flex', 'align-items': 'center', gap: 'var(--g-spacing-sm)' }}>
                <span>Email notifications</span>
                <Tooltip content="You will receive email updates when someone comments on your posts" placement="right">
                  <span style={{ cursor: 'help', color: 'var(--color-primary)' }}>
                    <BsInfoCircle />
                  </span>
                </Tooltip>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Compact Tooltips" subtitle="Using compact size for subtle hints" />
            <div class="flex--sm flex--wrap">
              <Tooltip content="Save" size="compact" placement="bottom">
                <Button size="compact" variant="primary">Save</Button>
              </Tooltip>
              <Tooltip content="Cancel" size="compact" placement="bottom">
                <Button size="compact" variant="subtle">Cancel</Button>
              </Tooltip>
              <Tooltip content="Delete" size="compact" placement="bottom">
                <Button size="compact" variant="danger">Delete</Button>
              </Tooltip>
            </div>
          </Card>

          <Card>
            <CardHeader title="Long Tooltip Content" subtitle="Tooltips automatically wrap text" />
            <div class="flex--sm flex--wrap">
              <Tooltip content="This is a longer tooltip with more detailed information. The text will automatically wrap to multiple lines when it exceeds the maximum width.">
                <Button variant="secondary">Long tooltip</Button>
              </Tooltip>
              <Tooltip content="Tooltips have a maximum width of 250px by default, which helps keep them readable and prevents them from stretching too wide across the screen.">
                <Button variant="secondary">Very long tooltip</Button>
              </Tooltip>
            </div>
          </Card>

          <h2>Badge Component Examples</h2>

          <Card>
            <CardHeader title="Notification Badges on Buttons" />
            <div class="flex--sm flex--wrap">
              <Badge content={5}>
                <Button variant="primary" icon={BsBell}>Notifications</Button>
              </Badge>
              <Badge content={12} variant="primary">
                <Button variant="secondary" icon={BsEnvelope}>Messages</Button>
              </Badge>
              <Badge content={99}>
                <Button variant="subtle" icon={BsStar}>Updates</Button>
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Badge on Icon-Only Buttons" />
            <div class="flex--sm flex--wrap">
              <Badge content={3}>
                <Button variant="subtle" icon={BsBell} />
              </Badge>
              <Badge content={8} variant="success">
                <Button variant="subtle" icon={BsEnvelope} />
              </Badge>
              <Badge content={150}>
                <Button variant="subtle" icon={BsStar} />
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Badge Variants" />
            <div class="flex--sm flex--wrap">
              <Badge content={5} variant="error">
                <Button variant="subtle" icon={BsBell} />
              </Badge>
              <Badge content={5} variant="primary">
                <Button variant="subtle" icon={BsBell} />
              </Badge>
              <Badge content={5} variant="success">
                <Button variant="subtle" icon={BsBell} />
              </Badge>
              <Badge content={5} variant="warning">
                <Button variant="subtle" icon={BsBell} />
              </Badge>
              <Badge content={5} variant="info">
                <Button variant="subtle" icon={BsBell} />
              </Badge>
              <Badge content={5} variant="neutral">
                <Button variant="subtle" icon={BsBell} />
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Badge Placements" />
            <div class="flex--sm flex--wrap" style={{ gap: "calc(var(--g-spacing) * 2)" }}>
              <Badge content={5} placement="top-right">
                <Button variant="secondary">Top Right</Button>
              </Badge>
              <Badge content={5} placement="top-left">
                <Button variant="secondary">Top Left</Button>
              </Badge>
              <Badge content={5} placement="bottom-right">
                <Button variant="secondary">Bottom Right</Button>
              </Badge>
              <Badge content={5} placement="bottom-left">
                <Button variant="secondary">Bottom Left</Button>
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Dot Badges" subtitle="Simple status indicators" />
            <div class="flex--sm flex--wrap">
              <Badge dot variant="success">
                <Button variant="subtle" icon={BsBell} />
              </Badge>
              <Badge dot variant="warning">
                <Button variant="subtle" icon={BsEnvelope} />
              </Badge>
              <Badge dot variant="error">
                <Button variant="subtle" icon={BsStar} />
              </Badge>
              <Badge dot variant="primary" placement="bottom-right">
                <Button variant="subtle" icon={BsGear} />
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Icon Badges" />
            <div class="flex--sm flex--wrap">
              <Badge icon={BsCheck} variant="success">
                <Button variant="subtle" icon={BsBell} />
              </Badge>
              <Badge icon={BsLightning} variant="warning">
                <Button variant="subtle" icon={BsEnvelope} />
              </Badge>
              <Badge icon={BsFire} variant="error">
                <Button variant="subtle" icon={BsStar} />
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Large Numbers" subtitle="Shows 99+ for numbers over max" />
            <div class="flex--sm flex--wrap">
              <Badge content={150}>
                <Button variant="subtle" icon={BsBell} />
              </Badge>
              <Badge content={1523}>
                <Button variant="subtle" icon={BsEnvelope} />
              </Badge>
              <Badge content={500} max={999}>
                <Button variant="subtle" icon={BsStar} />
              </Badge>
              <Badge content={1500} max={999}>
                <Button variant="subtle" icon={BsHeart} />
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Text Content Badges" />
            <div class="flex--sm flex--wrap">
              <Badge content="New">
                <Button variant="secondary">Updates</Button>
              </Badge>
              <Badge content="!" variant="warning">
                <Button variant="subtle" icon={BsGear} />
              </Badge>
              <Badge content="PRO" variant="primary">
                <Button variant="secondary">Feature</Button>
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Zero Values" subtitle="Hidden by default, shown with showZero" />
            <div class="flex--sm flex--wrap">
              <Badge content={0}>
                <Button variant="subtle" icon={BsBell} />
              </Badge>
              <Badge content={0} showZero>
                <Button variant="subtle" icon={BsEnvelope} />
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="Badges on Different Elements" />
            <div class="flex--sm flex--wrap">
              <Badge content={3}>
                <Checkbox label="Notifications" iconUnchecked={BsBell} iconChecked={BsBell} />
              </Badge>
              <Badge content="New" variant="success">
                <Button variant="primary" icon={BsDownload}>Download</Button>
              </Badge>
              <Badge dot variant="error" placement="bottom-right">
                <span style={{
                  display: "inline-block",
                  width: "48px",
                  height: "48px",
                  "border-radius": "50%",
                  background: "var(--color-gray-700)"
                }} />
              </Badge>
            </div>
          </Card>

          <Card>
            <CardHeader title="All Placement Combinations" />
            <div style={{
              display: "grid",
              "grid-template-columns": "repeat(2, 1fr)",
              gap: "calc(var(--g-spacing) * 2)",
              "max-width": "400px",
              "justify-items": "center"
            }}>
              <Badge content={1} placement="top-left">
                <div style={{
                  display: "inline-block",
                  padding: "var(--g-spacing)",
                  background: "var(--g-background-elevated)",
                  "border-radius": "var(--g-radius)",
                  "text-align": "center",
                  "min-width": "120px"
                }}>Top Left</div>
              </Badge>
              <Badge content={2} placement="top-right">
                <div style={{
                  display: "inline-block",
                  padding: "var(--g-spacing)",
                  background: "var(--g-background-elevated)",
                  "border-radius": "var(--g-radius)",
                  "text-align": "center",
                  "min-width": "120px"
                }}>Top Right</div>
              </Badge>
              <Badge content={3} placement="bottom-left">
                <div style={{
                  display: "inline-block",
                  padding: "var(--g-spacing)",
                  background: "var(--g-background-elevated)",
                  "border-radius": "var(--g-radius)",
                  "text-align": "center",
                  "min-width": "120px"
                }}>Bottom Left</div>
              </Badge>
              <Badge content={4} placement="bottom-right">
                <div style={{
                  display: "inline-block",
                  padding: "var(--g-spacing)",
                  background: "var(--g-background-elevated)",
                  "border-radius": "var(--g-radius)",
                  "text-align": "center",
                  "min-width": "120px"
                }}>Bottom Right</div>
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Test;
