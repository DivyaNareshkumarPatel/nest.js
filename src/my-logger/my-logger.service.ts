import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    async logToFile(entry) {
        const formattedEntry = `${Intl.DateTimeFormat('en-US', {
            dateStyle: 'full',
            timeStyle: 'short',
            timeZone: 'America/Chicago'
        }).format(new Date())}\t${entry}\n`

        try {
            if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
                await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'), { recursive: true })
            }
            await fsPromises.appendFile(path.join(__dirname, '..', '..', 'logs', 'app.log'), formattedEntry)
        }
        catch (e) {
            console.error('Failed to write to log file')
        }
    }
    log(message: any, context?: string) {
        const entry = `${context}\t${message}`
        this.logToFile(entry)
        super.log(message, context)
    }
    error(message: any, stackOrContext?: string) {
        const entry = `${stackOrContext}\t${message}`
        this.logToFile(entry)
        super.error(message, stackOrContext)
    }
}
