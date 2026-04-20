import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [
			react(),
			svgr({
				include: '**/*.svg',
				svgrOptions: {
					exportType: 'named',
					namedExport: 'ReactComponent',
				},
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		define: {
			'process.env.API_URL': JSON.stringify(env.API_URL),
		},
		build: {
			outDir: 'dist',
			sourcemap: false,
			emptyOutDir: true,
		},
		server: {
			port: 3000,
			open: false,
		},
		css: {
			modules: {
				localsConvention: 'camelCase',
				generateScopedName: '[name]__[local]__[hash:base64:5]',
			},
		},
	}
})
