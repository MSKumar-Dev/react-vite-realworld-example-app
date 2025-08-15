// Extend the Window interface for Cypress custom properties
interface Window {
  handleFromCypress?: (request: any) => Promise<any>
}
