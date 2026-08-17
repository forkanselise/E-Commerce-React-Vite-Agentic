# Nexus Bakery & Tech: Local Workflow & Implementation Plan

## 1. Development Workflow Guidelines

Based on the Nexus Bakery & Tech coding standards:

### 1.1 Backend (.NET 8 ASP.NET Core)
- **Architecture**: Strictly adhere to Clean Architecture (API, Application, Domain, Infrastructure).
- **Database**: Use MongoDB C# Driver (`BsonId`, `BsonRepresentation(BsonType.ObjectId)`). Always include `createdAt` and `updatedAt`. Use atomic operators for updates.
- **Dependency Injection**: Register all components in `Program.cs`.
- **Real-Time**: Stream agent interactions and live updates via `SignalR` (e.g., `AgentHub`, `VisitorHub`).
- **Testing**: Use `xUnit`, `FluentAssertions`, and `Moq`. Write `WebApplicationFactory` integration tests.

### 1.2 Frontend (React + Vite)
- **State Management**: Use `Zustand` (client state) and `TanStack React Query` (server state).
- **Styling**: Vanilla CSS with CSS Variables. Follow the "Glassmorphic Artisan + Tech" design (e.g., `--color-primary-400`, `--glass-bg`). Avoid Tailwind.
- **Components**: Functional, pure, and reusable. Use `lucide-react` for icons.
- **Testing**: `Vitest` and `@testing-library/react` for components, `Playwright` for E2E flows.

---

## 2. Multi-Agent AI Engine Context

The platform leverages a Multi-Agent AI Engine that communicates via SignalR. Agents are strictly bound to the Nexus Bakery domain.

### 2.1 Core Agents
1. **RouterConcierge Agent**:
   - Analyzes user intent and delegates queries to the appropriate specialist agent.
2. **StorefrontInventory Agent**:
   - Handles product inquiries, pricing, specifications, and cart operations.
3. **BakingMasterclass Agent**:
   - Answers questions about tutorials, skill levels, video chapters, recipes, and tools.
4. **WarehouseOps Agent**:
   - Admin-only agent. Handles real-time stock querying and inventory adjustments.

*Note: The AI Chatbot is strictly restricted to domain-related topics and must refuse outside queries.*

---

## 3. Implementation Plan: "Kitchen Accessories and Tools" Tab

### 3.1 Objective
Add a dedicated "Kitchen Accessories and Tools" section to the React frontend to prominently feature tools and electronics.

### 3.2 Frontend Updates
1. **Navigation (Navbar.jsx)**:
   - Add a new tab trigger for `Kitchen Accessories` in the main `<nav>` alongside Home, Store Catalog, and Masterclass Hub.
   - Use the `<Utensils />` icon from `lucide-react`.
2. **App Routing (App.jsx)**:
   - Introduce a new `activeTab` state handle (`kitchen-accessories`).
   - Create and mount the new `KitchenAccessories` component when the tab is active.
3. **Component Creation (KitchenAccessories.jsx)**:
   - Build a custom landing page for the tab.
   - Include a themed header and leverage the existing `StoreCatalog` logic, filtering specifically for `BakingTools` and `Electronics` categories.
4. **Agent Integration**:
   - Ensure the `StorefrontInventory` agent recognizes the new frontend route categorization if users query "What kitchen accessories do you have?".

### 3.3 Backend Considerations
- Ensure the `INITIAL_PRODUCTS` (or MongoDB equivalent) appropriately tags relevant products so the new tab's filters correctly display them.
- No immediate backend schema changes are required as products already have `category` (BakingTools, Electronics) and `tags`.
