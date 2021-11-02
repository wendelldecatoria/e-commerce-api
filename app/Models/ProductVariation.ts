import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProductVariation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'product_id' })
  public productId: number

  @column()
  public color: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
