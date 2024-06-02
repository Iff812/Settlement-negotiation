import React, { Suspense } from 'react';
import { Dashboard, Proposer, Negotiator } from './pages';
import { Route, Routes } from 'react-router-dom';

const App: React.FunctionComponent = () => {
    return (
        <div className="App">
            <Suspense>
                <Routes>
                    <Route path={'/proposer'} element={<Proposer />} />
                    <Route path={'/negotiator'} element={<Negotiator />} />

                    <Route path={'/'} element={<Dashboard />} />
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
