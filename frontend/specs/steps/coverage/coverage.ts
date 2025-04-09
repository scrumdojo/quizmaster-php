import * as fs from 'node:fs'
import * as path from 'node:path'
import type { Coverage } from '@playwright/test'
import v8toIstanbul from 'v8-to-istanbul'

const ensureDirExists = (dir: string) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

export const coverageDir = path.join(process.cwd(), 'coverage/temp')

export const emptyCoverageDir = () => {
    ensureDirExists(coverageDir)

    for (const file of fs.readdirSync(coverageDir)) {
        fs.unlinkSync(path.join(coverageDir, file))
    }
}

type V8JsCoverage = Awaited<ReturnType<Coverage['stopJSCoverage']>>
type IstanbulCoverage = ReturnType<ReturnType<typeof v8toIstanbul>['toIstanbul']>

export const toIstanbul = async (jsCoverage: V8JsCoverage): Promise<IstanbulCoverage> => {
    const istanbulCoverage = {}

    for (const entry of jsCoverage) {
        if (!entry.source || entry.url.indexOf('/src/') === -1) continue

        const fileName = entry.url ? new URL(entry.url).pathname.slice(1) : 'unknown.js'

        const converter = v8toIstanbul(fileName, 0, { source: entry.source })
        await converter.load() // Load and parse source maps if present.
        converter.applyCoverage(entry.functions)
        const fileCoverage = converter.toIstanbul()

        Object.assign(istanbulCoverage, fileCoverage)
    }
    return istanbulCoverage
}

export const writeCoverage = async (istanbulCoverage: IstanbulCoverage, testTitle: string) => {
    const safeTitle = testTitle.replace(/\s+/g, '_')

    const filePath = path.join(coverageDir, `${safeTitle}-${Date.now()}.json`)

    fs.writeFileSync(filePath, JSON.stringify(istanbulCoverage, null, 2))
}
