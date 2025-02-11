export const swaggerDoc =` openapi: 3.0.3 # or 3.1.0 -  Specify the OpenAPI version
info:
  title: Your API Title  # Replace with the title of your API
  description: |
    This is a sample API description.
    You can describe your API in detail here.
    Use Markdown for rich text formatting.
  version: 1.0.0  # Your API version
  termsOfService: http://example.com/terms/  # Optional: Link to your terms of service
  contact:
    name: API Support  # Optional: Contact information
    url: http://www.example.com/support
    email: support@example.com
  license:
    name: Apache 2.0  # Optional: License information
    url: https://www.apache.org/licenses/LICENSE-2.0.html

servers:
  - url: http://localhost:3000 # Base URL for local development
    description: Local development server
  - url: https://api.example.com # Example production URL - REPLACE THIS!
    description: Production server

paths:
  /items: # Path for managing items (example endpoint)
    get:
      summary: Get all items # Short summary of the operation
      description: Retrieve a list of all items. # Detailed description of the operation
      tags: # Group operations by tags for better organization (optional)
        - Items
      responses:
        '200': # HTTP status code for successful response
          description: Successful operation # Description of the response for 200 status
          content:
            application/json: # Media type of the response
              schema:
                type: array # Expected data type in the response body
                items:
                  $ref: '#/components/schemas/Item' # Reference to a schema defined in components

    post:
      summary: Create a new item # Short summary of the operation
      description: Add a new item to the inventory. # Detailed description of the operation
      tags:
        - Items
      requestBody: # Define the request body for POST requests
        required: true # Indicate if the request body is mandatory
        content:
          application/json: # Media type of the request body
            schema:
              $ref: '#/components/schemas/NewItem' # Reference to a schema for creating new items
      responses:
        '201': # HTTP status code for successful creation
          description: Item created successfully # Description of the response for 201 status
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Item' # Response schema can be the same as Item schema
        '400': # Example of a bad request response
          description: Invalid input # Description for a 400 status

  /items/{itemId}: # Path with a path parameter (itemId)
    get:
      summary: Get item by ID # Short summary of the operation
      description: Retrieve details of a specific item based on its ID. # Detailed description
      tags:
        - Items
      parameters: # Define path parameters
        - in: path # Parameter location - path, query, header, cookie
          name: itemId # Parameter name (must match the path placeholder)
          required: true # Parameter is mandatory
          description: ID of the item to retrieve # Parameter description
          schema:
            type: integer # Parameter data type
            format: int64 # Parameter format (optional, e.g., int32, int64, float, double)
      responses:
        '200':
          description: Successful operation
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Item'
        '404': # Example of a not found response
          description: Item not found # Description for 404 status

    put:
      summary: Update an existing item # Short summary
      description: Update the details of an item with the given ID. # Detailed description
      tags:
        - Items
      parameters:
        - in: path
          name: itemId
          required: true
          description: ID of the item to update
          schema:
            type: integer
            format: int64
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateItem' # Schema for updating items
      responses:
        '200':
          description: Item updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Item'
        '404':
          description: Item not found
        '400':
          description: Invalid input

    delete:
      summary: Delete an item # Short summary
      description: Remove an item from the inventory by its ID. # Detailed description
      tags:
        - Items
      parameters:
        - in: path
          name: itemId
          required: true
          description: ID of the item to delete
          schema:
            type: integer
            format: int64
      responses:
        '204': # No Content response for successful deletion
          description: Item deleted successfully (no response body) # Description for 204 status
        '404':
          description: Item not found

components: # Reusable components like schemas, parameters, responses, security schemes
  schemas: # Define data models (schemas)
    Item: # Schema for a single item
      type: object # Data type is an object (key-value pairs)
      properties:
        id:
          type: integer
          format: int64
          description: Unique identifier for the item
          example: 123
          readOnly: true # Indicate this property is read-only (e.g., generated by the server)
        name:
          type: string
          description: Name of the item
          example: "Sample Item"
        description:
          type: string
          description: Detailed description of the item
          example: "This is a sample item for demonstration."
        createdAt:
          type: string
          format: date-time # Example format for date and time
          description: Timestamp when the item was created
          readOnly: true

    NewItem: # Schema for creating a new item (may not include readOnly properties like 'id')
      type: object
      required: # List of required properties when creating a new item
        - name
      properties:
        name:
          type: string
          description: Name of the item
          example: "New Item Name"
        description:
          type: string
          description: Detailed description of the item (optional)
          example: "Optional description for the new item."

    UpdateItem: # Schema for updating an item (could be similar to NewItem but maybe with optional fields)
      type: object
      properties:
        name:
          type: string
          description: Updated name of the item (optional)
          example: "Updated Item Name"
        description:
          type: string
          description: Updated description of the item (optional)
          example: "Updated description."

  securitySchemes: # Define security schemes for your API (e.g., API keys, OAuth 2.0, HTTP Basic)
    apiKeyAuth: # Example API Key security scheme
      type: apiKey
      in: header # API key location (header, query, cookie)
      name: X-API-Key # Name of the API key header

security: # Apply security schemes to the entire API or specific operations
  - apiKeyAuth: [] # Apply apiKeyAuth to all operations (empty array for no scopes in apiKey)

# You can add more paths, schemas, parameters, responses, and security schemes as needed for your API.
`