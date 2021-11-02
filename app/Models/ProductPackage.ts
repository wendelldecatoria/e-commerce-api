import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductPackage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'product_id' })
  public productId: number

  @column()
  public weight: number

  @column()
  public length: number

  @column()
  public width: number

  @column()
  public height: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
