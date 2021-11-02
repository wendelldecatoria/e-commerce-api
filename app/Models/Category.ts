import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'parent_id' })
  public parentId: number

  @column()
  public name: string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Category, {
    localKey: 'parentId',
  })
  public subCategory: HasMany<typeof Category>
}
