import React, {
    Suspense,
    lazy
} from 'react';

import {
    Routes,
    Route
} from 'react-router-dom';

export const renderRoutes = (routes) => {
      
    return (
      <Suspense>
        <Routes>
          {routes.map((route, i) => {
            const Element = route.element;
  
            return (
                <Route
                key={i}
                path={route.path}
                exact={route.exact}

                element={
                    <Element />
                  }
              />
            );
          })}
        </Routes>
      </Suspense>
    );
  }
const routes = [
    {
        path: '/',
        element: lazy(() => import('./pages/Home')),
        label: "Home",
        inMenu: true
    },
     {
        path: '/post-recipe',
        element: lazy(() => import('./pages/PostRecipe')),
        label: "Post Recipe",
        inMenu: true
    },
]

export default routes
