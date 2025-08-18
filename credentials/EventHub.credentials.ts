import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class EventHub implements ICredentialType {
    name = 'eventHub';   // this is the reference used in your node
    displayName = 'EventHub API';
    documentationUrl = 'https://github.com/your-repo/eventhub';

    properties: INodeProperties[] = [
        {
            displayName: 'Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'http://127.0.0.1:5055/api',
            description: 'Base URL of the EventHub REST API',
        },
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            description: 'Optional API key for authentication',
        },
    ];
}
