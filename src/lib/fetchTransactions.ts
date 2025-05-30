const ETHERSCAN_API_KEY = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';

export async function fetchTransactions(address: string) {
    if (!ETHERSCAN_API_KEY) throw new Error('Falta la API Key de Etherscan');

    const url = `${ETHERSCAN_API_URL}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.result || data.result.length === 0) {
        return []; // sin error, pero sin datos
    }

    return data.result.map((tx: any) => ({
        hash: tx.hash,
        from: tx.from,
        to: tx.to,
        value: (parseFloat(tx.value) / 1e18).toFixed(4),
        timeStamp: tx.timeStamp,
    }));
}