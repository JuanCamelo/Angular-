import { DefaultUrlSerializer, UrlTree } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
    parse(url: string): UrlTree {

        if (!url) {
            // If no url is found, it parses empty string.
            return super.parse('');
        }

        if (url.indexOf('?') === -1 ) {
            // If no ? is found in the url, it doesn't contains query params.
            return super.parse(url.toLowerCase());
        }

        // If it contains query params, it pases the url to lower case without affecting the query params.
        const urlParts = url.split('?');
        const lowerCaseUrl = urlParts[0].toLocaleLowerCase();
        const queryParams = urlParts[1];
        const urlToParse = `${lowerCaseUrl}?${queryParams}`;

        return super.parse(urlToParse);
    }
}
