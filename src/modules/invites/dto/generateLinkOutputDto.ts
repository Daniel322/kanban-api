import { ApiProperty } from '@nestjs/swagger';

export class GeneratedLinkOutputDto {
  @ApiProperty()
  link: string;

  constructor(link: string) {
    this.link = link;
  }
}
