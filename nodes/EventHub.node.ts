import {
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	NodeConnectionType,
} from 'n8n-workflow';
declare const console: any;


export class EventHub implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'EventHub',
		name: 'eventHub',
		icon: 'file:eventHub.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with EventHub REST API',
		defaults: {
			name: 'EventHub',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],

		// credentials: [
		// 	{
		// 		name: 'eventHubApi',  // matches the name in EventHub.credentials.ts
		// 		required: true,
		// 	},
		// ],

		requestDefaults: {
			baseURL: 'http://localhost:5055/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Event', value: 'events' },
					{ name: 'Attendee', value: 'attendees' },
					{ name: 'Registration', value: 'registrations' },
				],
				default: 'events',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['events'],
					},
				},
				options: [
					{ name: 'Create', value: 'create', action: 'Create a new event' },
					{ name: 'Delete', value: 'delete', action: 'Delete an event' },
					{ name: 'Get', value: 'get', action: 'Get a specific event' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many events' },
					{ name: 'Update', value: 'update', action: 'Update an existing event' },
				],
				default: 'getAll',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['attendees'],
					},
				},
				options: [
					{ name: 'Create', value: 'create', action: 'Create a new attendee' },
					{ name: 'Delete', value: 'delete', action: 'Delete an attendee' },
					{ name: 'Get', value: 'get', action: 'Get a specific attendee' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many attendees' },
					{ name: 'Update', value: 'update', action: 'Update an existing attendee' },
				],
				default: 'getAll',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['registrations'],
					},
				},
				options: [
					{ name: 'Create', value: 'create', action: 'Create a new registration' },
					{ name: 'Delete', value: 'delete', action: 'Delete a registration' },
					{ name: 'Get', value: 'get', action: 'Get a specific registration' },
					{ name: 'Get Many', value: 'getAll', action: 'Get many registrations' },
					{ name: 'Update', value: 'update', action: 'Update an existing registration' },
				],
				default: 'getAll',
			},
			// ID field for get, update, delete operations
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				placeholder: 'Enter the ID',
				description: 'The ID of the resource to retrieve, update, or delete',
				required: true,
			},
			// Query parameters for getAll operations
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['events'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Date',
						name: 'date',
						type: 'string',
						default: '',
						placeholder: 'YYYY-MM-DD',
						description: 'Filter events by date',
					},
					{
						displayName: 'Location',
						name: 'location',
						type: 'string',
						default: '',
						placeholder: 'Enter location (partial match)',
						description: 'Filter events by location (partial match)',
					},
				],
			},
			// Event fields for create/update operations
			{
				displayName: 'Event Fields',
				name: 'eventFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['events'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						placeholder: 'Enter event name',
						description: 'The name of the event',
					},
					{
						displayName: 'Date',
						name: 'date',
						type: 'string',
						default: '',
						placeholder: '2025-08-20T09:00:00',
						description: 'The date and time of the event (ISO datetime)',
					},
					{
						displayName: 'Location',
						name: 'location',
						type: 'string',
						default: '',
						placeholder: 'Enter event location',
						description: 'The location of the event',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						placeholder: 'Enter event description',
						description: 'The description of the event',
					},
				],
			},
			// Attendee fields for create/update operations
			{
				displayName: 'Attendee Fields',
				name: 'attendeeFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['attendees'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						placeholder: 'Enter attendee name',
						description: 'The name of the attendee',
					},
					{
						displayName: 'Email',
						name: 'email',
						type: 'string',
						default: '',
						placeholder: 'Enter email address',
						description: 'The email address of the attendee',
					},
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
						placeholder: 'Enter phone number',
						description: 'The phone number of the attendee',
					},
				],
			},
			// Registration fields for create/update operations
			{
				displayName: 'Registration Fields',
				name: 'registrationFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['registrations'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Event ID',
						name: 'event_id',
						type: 'number',
						default: 0,
						placeholder: 'Enter event ID',
						description: 'The ID of the event',
						displayOptions: {
							show: {
								operation: ['create'],
							},
						},
					},
					{
						displayName: 'Attendee ID',
						name: 'attendee_id',
						type: 'number',
						default: 0,
						placeholder: 'Enter attendee ID',
						description: 'The ID of the attendee',
						displayOptions: {
							show: {
								operation: ['create'],
							},
						},
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Confirmed', value: 'confirmed' },
							{ name: 'Cancelled', value: 'cancelled' },
						],
						default: 'confirmed',
						description: 'The status of the registration',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: IDataObject[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let endpoint = '';
		let method = '';
		let body: IDataObject = {};

		// Build endpoint and method based on resource and operation
		switch (resource) {
			case 'events':
				endpoint = '/events';
				break;
			case 'attendees':
				endpoint = '/attendees';
				break;
			case 'registrations':
				endpoint = '/registrations';
				break;
		}

		// Handle different operations
		switch (operation) {
			case 'getAll':
				method = 'GET';
				// Add query parameters for events
				if (resource === 'events') {
					const additionalFields = this.getNodeParameter('additionalFields', 0) as IDataObject;
					const queryParams: string[] = [];

					if (additionalFields.date) {
						queryParams.push(`date=${encodeURIComponent(additionalFields.date as string)}`);
					}
					if (additionalFields.location) {
						queryParams.push(`location=${encodeURIComponent(additionalFields.location as string)}`);
					}

					if (queryParams.length > 0) {
						endpoint += `?${queryParams.join('&')}`;
					}
				}
				break;

			case 'get':
				method = 'GET';
				const id = this.getNodeParameter('id', 0) as string;
				endpoint += `/${id}`;
				break;

			case 'create':
				method = 'POST';

				if (resource === 'events') {
					const eventFields = this.getNodeParameter('eventFields', 0) as IDataObject;
					body = {};
					if (eventFields.name) body.name = eventFields.name;
					if (eventFields.date) body.date = eventFields.date;
					if (eventFields.location) body.location = eventFields.location;
					if (eventFields.description) body.description = eventFields.description;
				} else if (resource === 'attendees') {
					const attendeeFields = this.getNodeParameter('attendeeFields', 0) as IDataObject;
					body = {};
					if (attendeeFields.name) body.name = attendeeFields.name;
					if (attendeeFields.email) body.email = attendeeFields.email;
					if (attendeeFields.phone) body.phone = attendeeFields.phone;
				} else if (resource === 'registrations') {
					const registrationFields = this.getNodeParameter('registrationFields', 0) as IDataObject;
					body = {};
					if (registrationFields.event_id) body.event_id = registrationFields.event_id;
					if (registrationFields.attendee_id) body.attendee_id = registrationFields.attendee_id;
					if (registrationFields.status) body.status = registrationFields.status;
				}
				break;


			case 'update':
				method = 'PUT';
				const updateId = this.getNodeParameter('id', 0) as string;
				endpoint += `/${updateId}`;

				// Get fields based on resource
				if (resource === 'events') {
					const eventFields = this.getNodeParameter('eventFields', 0) as IDataObject;
					body = {};
					if (eventFields.name) body.name = eventFields.name;
					if (eventFields.date) body.date = eventFields.date;
					if (eventFields.location) body.location = eventFields.location;
					if (eventFields.description) body.description = eventFields.description;
				} else if (resource === 'attendees') {
					const attendeeFields = this.getNodeParameter('attendeeFields', 0) as IDataObject;
					body = {};
					if (attendeeFields.name) body.name = attendeeFields.name;
					if (attendeeFields.email) body.email = attendeeFields.email;
					if (attendeeFields.phone) body.phone = attendeeFields.phone;
				} else if (resource === 'registrations') {
					const registrationFields = this.getNodeParameter('registrationFields', 0) as IDataObject;
					body = {};
					if (registrationFields.status) body.status = registrationFields.status;
				}
				break;

			case 'delete':
				method = 'DELETE';
				const deleteId = this.getNodeParameter('id', 0) as string;
				endpoint += `/${deleteId}`;
				break;
		}

		// Make the API request
		// Fetch credentials
		// const credentials = await this.getCredentials('eventHubApi') as { baseURL: string; apiKey: string };
		// const baseURL = credentials?.baseURL || 'http://localhost:5055/api';
		const baseURL = 'http://localhost:5055/api';

		const requestOptions: IHttpRequestOptions = {
			method: method as any,
			url: endpoint,
			headers: { 'Content-Type': 'application/json' },
			baseURL,
		};


		if (method === 'POST' || method === 'PUT') {
			requestOptions.body = body;
		}
		console.log('Request method:', method);
		console.log('Request URL:', baseURL + endpoint);
		console.log('Request body:', body);
		console.log('Request headers:', requestOptions.headers);

		try {
			const response = await this.helpers.httpRequest(requestOptions);
			returnData.push(response);
		} catch (error) {
			if (this.continueOnFail()) {
				returnData.push({ error: error.message });
			} else {
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
