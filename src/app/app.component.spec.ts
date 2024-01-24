import { AppComponent } from "./app.component";
describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('should toggle the mode property', () => {
    // Arrange (optional, no spies needed for this example)

    // Act
    component.onToggleMode();

    // Assert
    expect(component.mode).toBe(true); // Assuming initial mode is false, toggle to true
  });

});
