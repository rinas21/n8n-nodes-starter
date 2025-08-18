# EventHub Node for n8n

A custom n8n node that integrates with the EventHub REST API to manage events, attendees, and registrations.

## Features

- **Complete CRUD Operations**: Create, Read, Update, Delete for all resources
- **Multiple Resources**: Events, Attendees, and Registrations
- **Query Parameters**: Filter events by date and location
- **Error Handling**: Proper error handling with continue on fail option
- **Type Safety**: Full TypeScript implementation

## API Base URL

```
http://localhost:5055/api
```

## Resources & Operations

### Events

- **Get Many**: `GET /events` - Retrieve all events with optional filtering
- **Get**: `GET /events/{id}` - Retrieve a specific event
- **Create**: `POST /events` - Create a new event
- **Update**: `PUT /events/{id}` - Update an existing event
- **Delete**: `DELETE /events/{id}` - Delete an event

### Attendees

- **Get Many**: `GET /attendees` - Retrieve all attendees
- **Get**: `GET /attendees/{id}` - Retrieve a specific attendee
- **Create**: `POST /attendees` - Create a new attendee
- **Update**: `PUT /attendees/{id}` - Update an existing attendee
- **Delete**: `DELETE /attendees/{id}` - Delete an attendee

### Registrations

- **Get Many**: `GET /registrations` - Retrieve all registrations
- **Get**: `GET /registrations/{id}` - Retrieve a specific registration
- **Create**: `POST /registrations` - Create a new registration
- **Update**: `PUT /registrations/{id}` - Update registration status
- **Delete**: `DELETE /registrations/{id}` - Delete a registration

## Node Parameters

### Resource Selection
- **Events**: Manage event data
- **Attendees**: Manage attendee information
- **Registrations**: Manage event registrations

### Operation Types
- **Create**: Add new resources
- **Delete**: Remove resources
- **Get**: Retrieve single resource
- **Get Many**: Retrieve multiple resources
- **Update**: Modify existing resources

### Event Fields (for Create/Update)
- **Name**: Event name (string)
- **Date**: Event date and time (ISO datetime format: `2025-08-20T09:00:00`)
- **Location**: Event location (string)
- **Description**: Event description (string)

### Attendee Fields (for Create/Update)
- **Name**: Attendee name (string)
- **Email**: Email address (string)
- **Phone**: Phone number (string)

### Registration Fields (for Create/Update)
- **Event ID**: ID of the event (number, required for create)
- **Attendee ID**: ID of the attendee (number, required for create)
- **Status**: Registration status (`confirmed` or `cancelled`)

### Query Parameters (Events - Get Many)
- **Date**: Filter by date (YYYY-MM-DD format)
- **Location**: Filter by location (partial match)

## Usage Examples

### Creating an Event
1. Set Resource to "Events"
2. Set Operation to "Create"
3. Fill in Event Fields:
   - Name: "Tech Conference 2025"
   - Date: "2025-08-20T09:00:00"
   - Location: "Convention Center"
   - Description: "Annual technology conference"

### Getting Events with Filters
1. Set Resource to "Events"
2. Set Operation to "Get Many"
3. In Additional Fields:
   - Date: "2025-08-20"
   - Location: "conference"

### Creating an Attendee
1. Set Resource to "Attendees"
2. Set Operation to "Create"
3. Fill in Attendee Fields:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Phone: "+1234567890"

### Creating a Registration
1. Set Resource to "Registrations"
2. Set Operation to "Create"
3. Fill in Registration Fields:
   - Event ID: 1
   - Attendee ID: 1
   - Status: "confirmed"

## API Response Format

The node returns the API response as JSON. Example responses:

### Events Response
```json
{
  "message": "Events retrieved successfully",
  "events": [
    {
      "id": 1,
      "name": "Tech Conference 2025",
      "date": "2025-08-20T09:00:00",
      "location": "Convention Center",
      "description": "Annual technology conference",
      "created_at": "2025-08-15T05:50:26.622883",
      "updated_at": "2025-08-15T05:50:26.622887"
    }
  ],
  "count": 1
}
```

### Error Response
```json
{
  "error": "Error description"
}
```

## Installation

1. Clone this repository
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Copy the `dist` folder to your n8n custom nodes directory
5. Restart n8n

## Development

- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Lint Fix**: `npm run lintfix`
- **Format**: `npm run format`

## Requirements

- n8n workflow engine
- EventHub API running on `http://localhost:5055`
- Node.js and npm

## Authentication

Currently, the EventHub API does not require authentication. All endpoints are publicly accessible.

**Note**: In a production environment, you should implement proper authentication and authorization.

## Error Handling

The node includes comprehensive error handling:
- HTTP errors are caught and returned as error objects
- The "Continue on Fail" option allows workflows to continue even if the API call fails
- Error messages are preserved and returned in the node output

## Future Enhancements

- Pagination support for getAll endpoints
- Authentication support (OAuth2, API keys)
- Additional filtering options
- Bulk operations
- Webhook support for real-time updates
