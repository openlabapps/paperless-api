type partialResponse = {
  next: string | null;
  previous: string | null;
};

function parseLink(link: string): number {
  const splitted = link.split('?page=');

  return parseInt(splitted[1], 10);
}

export function parseLinks<T>(data: partialResponse & unknown): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsedData: any = data;

  if (data.next) {
    parsedData.next = parseLink(data.next);
  }

  if (data.previous) {
    parsedData.previous = parseLink(data.previous);
  }

  return parsedData;
}
