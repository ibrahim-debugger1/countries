import { HeaderComponent } from "./header.component";


describe('CountryListComponent', () => {
  let component: HeaderComponent;
  beforeEach(() => {
    component = new HeaderComponent();
  });
  it('should emit toggleMode event and toggle mode property', () => {
    // Arrange
    const emitSpy = spyOn(component.toggleMode, 'emit');

    // Act
    component.changeMode();

    // Assert
    expect(emitSpy).toHaveBeenCalled();
    expect(component.mode).toBe(true); // Assuming initial mode is false, toggle to true
  });
});
