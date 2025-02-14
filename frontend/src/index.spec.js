import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createRoot} from 'react-dom/client';
import { Playground } from './spec/playground';


const root = createRoot(document.getElementById('root'))
root.render(<Playground/>);