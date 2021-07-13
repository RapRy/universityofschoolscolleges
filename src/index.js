import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack' 
import { BrowserRouter } from 'react-router-dom'

import store from './redux/store';
import App from './App'

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider>
            <BrowserRouter>
                <App /> 
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);