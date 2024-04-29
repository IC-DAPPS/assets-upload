import { AssetManager } from '@dfinity/assets';
import { HttpAgent, type Identity } from '@dfinity/agent';

const getAgent = async (identity: Identity): Promise<HttpAgent> => {
	// const host = import.meta.env.DEV ? 'http://localhost:8080/' : 'https://icp0.io';
	const host = import.meta.env.VITE_HOST;
	const agent: HttpAgent = new HttpAgent({ identity, host });

	// if (import.meta.env.DEV) {
	// 	await agent.fetchRootKey();
	// }
	if (import.meta.env.VITE_DFX_NETWORK === 'local') {
		await agent.fetchRootKey();
	}

	return agent;
};

export const getAssetManager = async (identity: Identity): Promise<AssetManager> => {
	const assetManager = new AssetManager({
		canisterId: import.meta.env.VITE_FRONTEND_CANISTER_ID, // Principal of assets canister
		agent: await getAgent(identity) // Identity in agent must be authorized by the assets canister to make any changes
	});

	return assetManager;
};
