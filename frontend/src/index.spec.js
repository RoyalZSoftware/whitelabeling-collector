import React from 'react';
import {createRoot} from 'react-dom/client';
import { Explorer } from './spec/explorer';


const root = createRoot(document.getElementById('root'))
root.render(<Explorer/>);