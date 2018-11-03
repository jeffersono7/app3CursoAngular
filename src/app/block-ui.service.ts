import { Subject } from 'rxjs/Subject';

export class BlockUIService {

    private monitorBlock: Subject<boolean>;

    public init(monitor: Subject<boolean>): void {
        this.monitorBlock = monitor;
    }

    public start(): void {
        this.monitorBlock.next(true);
    }

    public stop(): void {
        this.monitorBlock.next(false);
    }
}
