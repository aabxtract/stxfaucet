# **App Name**: NeonDrip Faucet

## Core Features:

- Connect Wallet: Allow users to connect their Stacks wallet using @stacks/connect.
- Token Request: Implement a "Request Tokens" button that triggers the faucet contract call to claim STX tokens.
- Clarity Contract Interaction: Integrate with a Clarity smart contract to distribute STX tokens, ensuring the block-height difference since the last claim is greater than 144 blocks. Use Stacks.js to call the contract function.
- Cooldown Timer: Display a countdown timer to show the remaining time until the user can claim tokens again.
- Transaction Broadcasting Glitch: Add a CSS animation that simulates a screen glitch for 0.5 seconds when the user clicks "Request" to indicate that the blockchain transaction is broadcasting.
- Terminal-Style Log Window: Simulate a terminal log window that types out initialization messages and status updates related to the faucet connection.

## Style Guidelines:

- Background color: Dark grey (#0a0a0a) for a retro-futuristic terminal look.
- Primary color: Matrix Green (#00ff41) for main UI elements and text.
- Accent color: Cyber Pink (#ff00ff) for highlights, interactive elements, and visual accents.
- Body and headline font: 'Space Grotesk' sans-serif for a computerized, techy look. Use 'Inter' for longer text, if present.
- Use simple, geometric icons in Matrix Green and Cyber Pink to maintain the retro-futuristic terminal aesthetic.
- Design the layout to mimic a terminal interface, with clear divisions and a focus on text-based information.
- Implement a "Scanline" CSS effect over the whole page to emulate a CRT monitor. Make the "Request Tokens" button pulse with a glowing effect.