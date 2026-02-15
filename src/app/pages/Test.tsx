import { createSignal } from 'solid-js';
import { type RouteSectionProps, useNavigate, useLocation } from '@solidjs/router';
import { GridBackground } from '../../components/surfaces/GridBackground';
import { Pane, type PaneState } from '../../components/navigation/Pane';
import { Tabs } from '../../components/navigation/Tabs';
import {
  BsType, BsInputCursor, BsCardText, BsCheckSquare, BsCircle,
  BsList, BsChevronExpand, BsSliders, BsCursor, BsGrid,
  BsArrowRepeat, BsWindowStack, BsBell, BsChat, BsAward,
  BsPerson, BsFolder, BsLayoutSidebar, BsFileText, BsTable, BsThreeDots,
  BsChevronBarLeft, BsChevronRight, BsChevronBarExpand,
} from 'solid-icons/bs';

const tabOptions = [
  { value: 'typography', label: 'Typography', icon: BsType },
  { value: 'textfield', label: 'TextField', icon: BsInputCursor },
  { value: 'card', label: 'Card', icon: BsCardText },
  { value: 'checkbox', label: 'Checkbox', icon: BsCheckSquare },
  { value: 'radiogroup', label: 'RadioGroup', icon: BsCircle },
  { value: 'combobox', label: 'Combobox', icon: BsList },
  { value: 'multiselect', label: 'Multi-Select', icon: BsChevronExpand },
  { value: 'slider', label: 'Slider', icon: BsSliders },
  { value: 'button', label: 'Button', icon: BsCursor },
  { value: 'buttongroup', label: 'ButtonGroup', icon: BsGrid },
  { value: 'progress', label: 'Progress', icon: BsArrowRepeat },
  { value: 'dialog', label: 'Dialog', icon: BsWindowStack },
  { value: 'notification', label: 'Notification', icon: BsBell },
  { value: 'tooltip', label: 'Tooltip', icon: BsChat },
  { value: 'badge', label: 'Badge', icon: BsAward },
  { value: 'avatar', label: 'Avatar', icon: BsPerson },
  { value: 'tabs', label: 'Tabs', icon: BsFolder },
  { value: 'pane', label: 'Pane', icon: BsLayoutSidebar },
  { value: 'form', label: 'Form', icon: BsFileText },
  { value: 'table', label: 'Table', icon: BsTable },
  { value: 'menu', label: 'Menu', icon: BsThreeDots },
  { value: 'pagination', label: 'Pagination', icon: BsChevronBarLeft },
  { value: 'breadcrumbs', label: 'Breadcrumbs', icon: BsChevronRight },
  { value: 'accordion', label: 'Accordion', icon: BsChevronBarExpand },
];

const Test = (props: RouteSectionProps) => {
  const [paneState, setPaneState] = createSignal<PaneState>('partial');
  const navigate = useNavigate();
  const location = useLocation();

  const activeDemo = () => location.pathname.replace(/^\//, '') || 'typography';

  return (
    <>
      <GridBackground gridSize={10} />

      <div class="content" style={{ display: "flex", height: "100%", width: "100%" }}>
        <Pane
          position="left"
          mode="permanent"
          openSize="200px"
          partialSize="50px"
          state={paneState()}
          onStateChange={setPaneState}
        >
          <Tabs
            scrollable
            orientation="vertical"
            variant="subtle"
            value={activeDemo()}
            onChange={(value: string) => navigate(`/${value}`)}
            options={tabOptions}
            class={paneState() !== 'open' ? 'tabs--labels-hidden' : ''}
          />
        </Pane>

        <div style={{ flex: 1, overflow: "auto" }}>
          <div class="container grid">
            <h1>MidnightUI Component Library</h1>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
