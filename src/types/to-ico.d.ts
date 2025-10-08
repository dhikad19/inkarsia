declare module "to-ico" {
  export default function toIco(
    images: Buffer[] | ArrayLike<Buffer>
  ): Promise<Buffer>;
}
