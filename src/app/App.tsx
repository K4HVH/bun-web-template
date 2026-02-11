import type { Component } from 'solid-js';
import { Router, Route, Navigate } from '@solidjs/router';
import { NotificationProvider } from '../components/feedback/Notification';
import Test from './pages/Test';

import TypographyDemo from './pages/demos/TypographyDemo';
import TextFieldDemo from './pages/demos/TextFieldDemo';
import CardDemo from './pages/demos/CardDemo';
import CheckboxDemo from './pages/demos/CheckboxDemo';
import RadioGroupDemo from './pages/demos/RadioGroupDemo';
import ComboboxDemo from './pages/demos/ComboboxDemo';
import MultiSelectComboboxDemo from './pages/demos/MultiSelectComboboxDemo';
import SliderDemo from './pages/demos/SliderDemo';
import ButtonDemo from './pages/demos/ButtonDemo';
import ButtonGroupDemo from './pages/demos/ButtonGroupDemo';
import SpinnerDemo from './pages/demos/SpinnerDemo';
import DialogDemo from './pages/demos/DialogDemo';
import NotificationDemo from './pages/demos/NotificationDemo';
import TooltipDemo from './pages/demos/TooltipDemo';
import BadgeDemo from './pages/demos/BadgeDemo';
import AvatarDemo from './pages/demos/AvatarDemo';
import TabsDemo from './pages/demos/TabsDemo';
import PaneDemo from './pages/demos/PaneDemo';
import FormDemo from './pages/demos/FormDemo';
import TableDemo from './pages/demos/TableDemo';
import MenuDemo from './pages/demos/MenuDemo';

const App: Component = () => {
  return (
    <NotificationProvider>
      <Router>
        <Route path="/" component={Test}>
          <Route path="/" component={() => <Navigate href="/typography" />} />
          <Route path="typography" component={TypographyDemo} />
          <Route path="textfield" component={TextFieldDemo} />
          <Route path="card" component={CardDemo} />
          <Route path="checkbox" component={CheckboxDemo} />
          <Route path="radiogroup" component={RadioGroupDemo} />
          <Route path="combobox" component={ComboboxDemo} />
          <Route path="multiselect" component={MultiSelectComboboxDemo} />
          <Route path="slider" component={SliderDemo} />
          <Route path="button" component={ButtonDemo} />
          <Route path="buttongroup" component={ButtonGroupDemo} />
          <Route path="spinner" component={SpinnerDemo} />
          <Route path="dialog" component={DialogDemo} />
          <Route path="notification" component={NotificationDemo} />
          <Route path="tooltip" component={TooltipDemo} />
          <Route path="badge" component={BadgeDemo} />
          <Route path="avatar" component={AvatarDemo} />
          <Route path="tabs" component={TabsDemo} />
          <Route path="pane" component={PaneDemo} />
          <Route path="form" component={FormDemo} />
          <Route path="table" component={TableDemo} />
          <Route path="menu" component={MenuDemo} />
        </Route>
      </Router>
    </NotificationProvider>
  );
};

export default App;
