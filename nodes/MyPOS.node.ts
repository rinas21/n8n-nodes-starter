import {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

export class MyPOS implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MyPOS',
		name: 'mypos',
		icon: 'file:mypos.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with myPOS Transactions API using OAuth',
		defaults: {
			name: 'MyPOS',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],

		credentials: [
			{
				name: 'myPOSOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://transactions-api.mypos.com/v1/',
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
					{ name: 'Transactions', value: 'transactions' },
				],
				default: 'transactions',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'List Transactions', value: 'listTransactions', action: 'List all transactions' },
					{ name: 'Get Transaction Details', value: 'getTransactionDetails', action: 'Get details of a specific transaction' },
				],
				default: 'listTransactions',
			},
			{
				displayName: 'Transaction ID',
				name: 'transactionId',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['getTransactionDetails'],
					},
				},
				default: '',
				placeholder: 'Enter the transaction ID',
				description: 'The ID of the transaction to retrieve',
				required: true,
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['listTransactions'],
					},
				},
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Filter transactions starting from this date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['listTransactions'],
					},
				},
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Filter transactions up to this date',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['transactions'],
						operation: ['listTransactions'],
					},
				},
				options: [
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Completed', value: 'completed' },
							{ name: 'Pending', value: 'pending' },
							{ name: 'Failed', value: 'failed' },
						],
						default: '',
						description: 'Filter transactions by status',
					},
					{
						displayName: 'Merchant ID',
						name: 'merchantId',
						type: 'string',
						default: '',
						description: 'Filter transactions by merchant ID',
					},
				],
			},
		],
	};
}
