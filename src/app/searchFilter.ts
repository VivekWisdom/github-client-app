import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'searchFilter'
})
@Injectable()
export class MySearchFilter implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.filter(item => item.indexOf(args[0]) !== -1);
    }
}
