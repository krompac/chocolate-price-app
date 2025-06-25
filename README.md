# ChocolatePrice

Source code for ChocolatePrice overview application.

## Installation

First run:

```bash
npm install --legacy-peer-deps
```

Once the packages are installed run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Improvements for the application

### State management

- [ ] Implement Ngrx signal store to ensure that application will scale better with more data (https://ngrx.io/guide/signals/signal-store)

### Code quality

- [ ] Add eslint to the project with angular-lint rules, to ensure better code quality.

### Search, pagination, filters

- [ ] Implement search component
- [ ] Implement pagination component (or add some package)
- [ ] Filter by cholocate brand
- [ ] On query changes (either search or pagination change) make api call to fetch filtered data -> use rxResource to handle this smoothly (or Ngrx store if implemented from before)

### Optimization

- [ ] Add ChangeDetection.OnPush strategy to every component
- [ ] Add to angular.json schematics that each new component generated has ChangeDetection.OnPush

### Styling and design

- [ ] Create a theme.less file and declare reusable less variables to store colors and other reusable properties throught the stylesheets
- [ ] Support multiple themes
- [ ] Add better loading data indicator

### Bonus tasks from the requirements

- [ ] highlight cheapest price per 100g in the details view
- [ ] name and brand editable in details view -> ensure that it will smoothly work with backend later on
- [ ] display nutritional values via the pie chart for each chocolate

### Error handling

- [ ] add error handling for chocolates fetch
- [ ] add error handling when user wants to navigate to chocolate details view of a non existent chocolate
