# Admin Product & Tutorial Management Implementation Plan

## 1. Objective
Implement the admin-only functionality to create (add) and update (edit) products (bakery items, baking tools, machines) and tutorials in the Nexus Bakery & Tech platform. This feature requires category selection, picture/video uploads, and data entry for details and titles.

## 2. Backend Implementation (ASP.NET Core 8)

### 2.1 API Endpoints
All modifying endpoints must be protected with `[Authorize(Roles = "Admin, SystemAdmin")]`.

**Products (`ProductsController`)**
- `POST /api/products`: Create a new product. Expects multipart/form-data if image is uploaded concurrently, or a separate JSON body followed by an image upload.
- `PUT /api/products/{id}`: Update an existing product.
- `POST /api/products/{id}/images`: Handle image uploads (IFormFile).

**Tutorials (`TutorialsController`)**
- `POST /api/tutorials`: Create a new tutorial. Expects multipart/form-data for video/thumbnail and metadata.
- `PUT /api/tutorials/{id}`: Update tutorial metadata and settings.

### 2.2 Application Layer (Services & DTOs)
- **DTOs**:
  - `CreateProductDto`, `UpdateProductDto`: Fields for `Title`, `Category`, `SubCategory`, `Description`, `Price`, `WarehouseStock`, etc.
  - `CreateTutorialDto`, `UpdateTutorialDto`: Fields for `Title`, `Category`, `SkillLevel`, `DurationMinutes`, etc.
- **Services**:
  - `IProductService.cs` & `ProductService.cs`: Implement `CreateAsync`, `UpdateAsync`, and `UploadImageAsync`.
  - `ITutorialService.cs` & `TutorialService.cs`: Implement `CreateAsync`, `UpdateAsync`, and `UploadMediaAsync`.

### 2.3 Data Access & File Storage
- **MongoDB**: Use `ProductRepository` and `TutorialRepository` for `InsertOneAsync` and `ReplaceOneAsync` operations.
- **Storage**: Integrate local file system saving or cloud storage (AWS S3/Cloudinary) for handling the uploaded pictures and videos.

---

## 3. Frontend Implementation (Vite + React)

### 3.1 Routing & Protection
- Create an `<AdminRoute>` or `<ProtectedRoute>` wrapper that checks the user's role (`user.role === 'Admin' || user.role === 'SystemAdmin'`).
- Add the following routes to `router.jsx`:
  - `/admin/products/new`: Add Item path for products.
  - `/admin/products/:id/edit`: Update Item path for products.
  - `/admin/tutorials/new`: Add Item path for tutorials.
  - `/admin/tutorials/:id/edit`: Update Item path for tutorials.

### 3.2 Form Components
- **`ProductForm.jsx`**:
  - **Fields**: Title, Category Dropdown (Bakery Items, Baking Tools, Machines/Electronics), SubCategory, Description, Price, Stock count.
  - **Media**: Image upload input with preview.
  - **Mode**: Accepts a `mode="add" | "edit"` and `initialData` props.
- **`TutorialForm.jsx`**:
  - **Fields**: Title, Category, Skill Level, Description, Instructor details.
  - **Media**: Thumbnail upload, Video file upload.
  - **Mode**: Accepts `mode="add" | "edit"` and `initialData` props.

### 3.3 State Management & API Integration
- **`services/api.js`**: Add API call wrappers (`createProduct`, `updateProduct`, `uploadProductImage`, etc.).
- **React Query (TanStack)**:
  - `useQuery` to fetch existing item details for the edit path.
  - `useMutation` to handle form submissions (POST/PUT).
  - Use `FormData` to send the multipart requests for image/video uploads.

### 3.4 UI/UX & Design
- **Styling**: Strictly adhere to the Glassmorphic Artisan + Tech design aesthetic using Vanilla CSS variables (e.g., `--glass-bg`, `--color-primary-400`).
- **Feedback**: Implement toast notifications for successful creations/updates or error handling.
- **Loading States**: Add spinner/loading animations during picture uploads and form submissions.

---

## 4. Execution Steps
1. **Backend Foundation**: Build DTOs, Services, and Controllers for Products and Tutorials.
2. **File Upload Handling**: Implement the infrastructure for saving product images and tutorial thumbnails.
3. **Frontend Routes & Services**: Setup protected routes and API service methods.
4. **Form Building**: Construct the React form components with validation (using a library like `react-hook-form` or standard state).
5. **Integration**: Connect forms to the backend endpoints using `FormData`.
6. **Testing**: Verify role-based access limits, successful additions/updates, and image uploads.
