import {
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class MyPOSApi implements ICredentialType {
    name = 'myPOSOAuth2Api'; // Keep this as is to match your node
    displayName = 'MyPOS OAuth2 API';
    documentationUrl = 'https://developers.mypos.com';
    extends = ['oAuth2Api'];

    properties: INodeProperties[] = [
        {
            displayName: 'Environment',
            name: 'environment',
            type: 'options',
            options: [
                {
                    name: 'Production',
                    value: 'production',
                },
                {
                    name: 'Sandbox',
                    value: 'sandbox',
                },
            ],
            default: 'sandbox',
        },
        {
            displayName: 'Client ID',
            name: 'clientId',
            type: 'string',
            default: '',
        },
        {
            displayName: 'Client Secret',
            name: 'clientSecret',
            type: 'string',
            typeOptions: { password: true },
            default: '',
        },
        {
            displayName: 'OAuth2 Authorization URL',
            name: 'authUrl',
            type: 'hidden',
            default: '={{ $parameter["environment"] === "production" ? "https://www.mypos.com/vmp/authorize" : "https://www.sandbox.mypos.com/vmp/authorize" }}',
        },
        {
            displayName: 'OAuth2 Token URL',
            name: 'tokenUrl',
            type: 'hidden',
            default: '={{ $parameter["environment"] === "production" ? "https://www.mypos.com/vmp/token" : "https://www.sandbox.mypos.com/vmp/token" }}',
        },
    ];
}
