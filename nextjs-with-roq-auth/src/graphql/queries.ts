export const filesQuery = `query Files($limit:Int, $offset:Int, $filter: FileFilterArgType){
                      files(limit:$limit, offset: $offset, filter: $filter){
                        totalCount
                        data {
                          id
                          name
                          url
                          createdAt
                          createdByUser{
                            firstName
                            lastName
                          }
                        }
                      }
                    }`;

export const fileCategoriesQuery = `query FileCategories {
                      fileCategories {
                        totalCount
                        data {
                          name
                          key
                        }
                      }
                    }`;
