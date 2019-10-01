<template>
  <div class="row" style="height: 100vh; overflow-x: scroll">


    <div class="col-12">
      <q-tab-panels
        v-model="editorTab"
        transition-prev="jump-up"
        transition-next="jump-up">
        <q-tab-panel :key="table" v-for="table in userModels.map(function(e){return e.table_name})" :name="table"
                     :label="table">
          <div class="row" style="height: 90vh">
            <div class="col-12" :id="'dataGrid_' + table" :ref="'dataViewDiv_' + table"></div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>


    <div class="col-1" style="height: 50px;">
      <q-btn style="width: 80%;height: 80%;margin-left: 10px;margin-top: 5px;" @click.prevent="newTable()" label=""
             icon="add"></q-btn>
    </div>
    <div class="col-11" style="height: 50px;">
      <q-tabs align="left" v-model="editorTab">
        <q-tab :key="table.table_name" v-for="table in userModels.map(function(e){return e.table_name})"
               :label="table" :name="table">
        </q-tab>
      </q-tabs>
    </div>


    <q-dialog v-model="newTableDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Table name</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="newTableName" autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Add" @click="newTable(newTableName)" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
  import jexcel from 'jexcel';
  import {mapActions, mapGetters} from 'vuex';

  require('jexcel/dist/jexcel.min.css');
  const debounce = require('debounce');

  export default {
    computed: {
      ...mapGetters([
        'appLayout',
        'userModels',
      ])
    },
    data() {
      return {
        newTableDialog: false,
        newTableName: null,
        editorTab: null,
      }
    },
    watch: {
      'editorTab': function (newTableName) {
        const that = this;
        that.setGridData(that.editorTab);
      },
    },
    mounted() {
      this.editorTab = this.userModels[0].table_name;

    },
    name: "DataGrid",
    methods: {
      ...mapActions([
        'setLayout',
        'getData',
        'saveConfig',
        'setTemplate',
        'addLayout',
        'addNewTab',
        'createTemplate',
        'refreshActions',
        'invokeEvent',
        'refreshModels']
      ),
      newTable(tableName) {
        const that = this;
        console.log("new table add", tableName)
        if (!tableName) {
          this.newTableDialog = true;
        } else {


          var schema = JSON.stringify({
            Tables: [
              {
                TableName: tableName,
                Columns: [],
              }
            ],
          });


          that.invokeEvent({
            type: 'action',
            params: {
              action_name: 'upload_system_schema',
              schema_file: [{
                "name": "new_column.json",
                "file": "data:application/json;base64," + btoa(schema),
                "type": "application/json"
              }],
            }
          }).then(function () {
            that.refreshModels();
          })

        }
      },

      setGridData(tableName) {
        if (!tableName) {
          return
        }


        const that = this;

        const dataModel = that.userModels.filter(function (e) {
          return e.table_name == tableName
        })[0]
        const schema = JSON.parse(dataModel.world_schema_json);
        const schemaColumns = schema.Columns;

        var fkeys = schemaColumns.filter(function (e) {
          return e.IsForeignKey
        }).map(function (e) {
          return e.ForeignKeyData.Namespace
        }).join(",");

        that.getData({
          layout: {
            type: "list",
            item: tableName,
          },
          params: {
            included_relations: "*",
          }
        }).then(function (data) {
          console.log("Table data", dataModel, tableName, data);

          var headers = [];
          var columns = [];
          var ids = [];
          var spreadSheetData = [];
          var rows = data;
          console.log("loaded data", data, spreadSheetData);
          const skipColumns = ["id", "created_at", "updated_at", "version", "permission", "reference_id", "user_account_id"];


          // let keys = Object.keys(data[0]);
          var columnMap = {};
          for (var columnId in schemaColumns) {
            var column = schemaColumns[columnId];
            console.log("column ", column);
            columnMap[column.ColumnName] = column

            if (!column.Name) {
              console.log("Column has no name", column);
            }

            // if (column.Name.endsWith("reference_id")) {
            //   continue
            // }
            if (column.Name.substring(0, 2) == "__") {
              continue
            }
            let jColumn = {
              type: 'text',
              title: column.ColumnName,
              width: 300,
            };

            if (column.IsForeignKey) {

              if (column.ColumnType.startsWith("image.")) {
                console.log("image column", column)
                // jColumn.editor = (wcolumn.ColumnName)
                // jColumn.type = "image";
                jColumn.width = 120;

              } else {
                jColumn.editor = (function (tableName) {
                  var selectColumn = null;
                  var options = null;
                  return {
                    // Methods
                    closeEditor: function (cell, save) {
                      var value = cell.children[0].value;
                      cell.innerHTML = value;
                      return value;
                    },
                    openEditor: function (cell) {
                      // Create input
                      var value = cell.innerText;
                      if (!options) {


                        that.getData({
                          layout: {
                            type: "list",
                            item: tableName,
                            page: {
                              size: 500
                            },
                          }
                        }).then(function (data) {
                          options = data;
                          selectColumn = document.createElement("select");

                          var defaultOption = document.createElement("option");
                          defaultOption.innerText = '';
                          selectColumn.appendChild(defaultOption)

                          for (var i = 0; i < data.length; i++) {
                            // console.log("add option", data[i]);
                            var option = document.createElement("option");
                            option.innerText = data[i].reference_id;
                            if (value == data[i].reference_id) {
                              option.selected = true;
                            }
                            selectColumn.appendChild(option)
                          }


                          cell.innerHTML = '';
                          cell.appendChild(selectColumn);
                          selectColumn.focus();


                        });
                      } else {
                        var data = options;
                        selectColumn = document.createElement("select");

                        var defaultOption = document.createElement("option");
                        defaultOption.innerText = '';
                        selectColumn.appendChild(defaultOption)

                        for (var i = 0; i < data.length; i++) {
                          // console.log("add option", data[i]);
                          var option = document.createElement("option");
                          option.innerText = data[i].reference_id;
                          if (value == data[i].reference_id) {
                            option.selected = true;
                          }
                          selectColumn.appendChild(option)
                        }


                        cell.innerHTML = '';
                        cell.appendChild(selectColumn);
                        selectColumn.focus();
                      }

                    },
                    getValue: function (cell) {
                      console.log("cell get value", tableName, cell.innerHTML)
                      if (cell.children.length > 0) {
                        return {id: cell.children[0].value, type: 'entity'};
                      } else {

                        return {id: cell.innerText, type: 'entity'};
                      }
                    },
                    setValue: function (cell, value) {
                      console.log("set value for cell", value)
                      cell.innerText = value;
                    }
                  }
                }(column.ForeignKeyData.Namespace))

              }

              console.log("foreking column", column)

              // continue;
            }

            if (skipColumns.indexOf(column.ColumnName) > -1) {
              continue;
            }
            headers.push(column.ColumnName);

            columns.push(jColumn)
          }
          var widths = [];
          var maxLength = [];

          if (columns.length == 0) {
            columns.push({
              type: 'text',
              title: 'A',
              width: 300,
            })
            columns.push({
              type: 'text',
              title: 'B',
              width: 300,
            })
            columns.push({
              type: 'text',
              title: 'C',
              width: 300,
            })
          }

          for (var i = 0; i < rows.length; i++) {
            var row = [];
            console.log("Create row ", rows[i])
            for (var j in headers) {
              var column = headers[j];
              // console.log("spps s", i, column, column, rows[i])
              var colInfo = columnMap[column];
              if (colInfo.ColumnType.startsWith("image.")) {
                console.log("image column")
                var imgElement = document.createElement("img");
                let imageSource = that.appLayout.endpoint + "/asset/" + tableName + "/" + rows[i]["id"] + "/" + column + ".png";
                imgElement.src = imageSource;
                row.push('<img style="height:100px;" src="' + imageSource + '">')
                // if (rows[i][column] && rows[i][column].length > 0) {
                //   row.push("data:image/png;base64," + rows[i][column][0]["contents"])
                // } else {
                //   row.push('');
                // }
              } else if (rows[i][column] instanceof Array) {
                row.push(rows[i][column].join(","))
              } else if (rows[i][column] instanceof Object) {
                row.push(rows[i][column]["reference_id"])
              } else {
                row.push(rows[i][column])
              }
              if (!maxLength[j] || maxLength[j] < new String(row[j]).length) {
                maxLength[j] = row[j] ? new String(row[j]).length : 0;
              }
              j += 1;
            }
            spreadSheetData.push(row);
            ids.push(rows[i].reference_id)
          }

          var newRow = [];

          for (var c in columns) {
            newRow.push('');
          }
          console.log("ids", ids)

          for (var i = 0; i < 10; i++) {
            spreadSheetData.push(newRow)
          }

          for (var i = 0; i < maxLength.length; i++) {
            if (maxLength[i] > 1000) {
              maxLength[i] = 1000;
            }
            widths[i] = maxLength[i] * 5 + 100;
            columns[i].width = widths[i];
          }

          console.log('grid data', tableName, spreadSheetData)
          console.log("immediate load data", widths)

          console.log("div name", "dataViewDiv_" + tableName, that.$refs["dataViewDiv_" + tableName])


          document.getElementById('dataGrid_' + tableName).innerHTML = '';

          let spreadsheet = jexcel(that.$refs["dataViewDiv_" + tableName][0], {
            data: spreadSheetData,
            columns: columns,
            defaultColWidth: 300,

            ondeleterow: function (container, startIndex, length, items) {

              for (var i = startIndex; i < startIndex + length; i++) {

                if (i >= data.length) {
                  break;
                }
                let referenceId = data[i].id;
                console.log("Delete row", referenceId)
                that.fireEvent({
                  type: 'delete',
                  params: referenceId
                })
              }
              console.log("arguments on delete row", arguments)
            },
            onpaste: function () {
              console.log("grid pasete even", arguments)
            },
            onchange: function (gridContainer, tdContainer, xCell, yCell, newValue, oldValue) {
              // console.log("value change", arguments);
              var row = spreadsheet.getRowData(yCell);
              console.log("row", row);
              var obj = {};
              if (yCell > data.length - 1) {
                // console.log("new row");

                const newRow = {};
                const newGridRow = [];

                for (let i = 0; i < columns.length; i++) {
                  var colName = columns[i].title


                  var columnModel = schemaColumns.filter(function (e) {
                    return e.ColumnName == colName;
                  })[0];

                  var val = row[i];
                  // console.log("new col ", colName, val);
                  if (val && val.length > 0) {

                    if (columnModel.IsForeignKey) {
                      newRow[colName] = {
                        id: val,
                        type: 'entity'
                      }
                    } else {

                      newRow[colName] = val
                    }

                  }
                  newGridRow.push(val)
                }
                newRow["table_name"] = tableName;

                that.invokeEvent({
                    type: "post",
                    params: newRow
                  }
                ).then(function (response) {
                  console.log("create response", response);
                  // data.push(response.data);
                  that.setGridData(tableName);
                  // if (newValue != response.data[updatedColumn]) {
                  //   spreadsheet.setValueFromCoords(xCell, yCell, response.data[updatedColumn])
                  // }
                });


              } else {
                var existingRow = data[yCell];
                var updatedColumn = columns[xCell].title;
                console.log("update row", updatedColumn, existingRow);

                var columnModel = schemaColumns.filter(function (e) {
                  return e.ColumnName == updatedColumn;
                })[0];

                existingRow[updatedColumn] = newValue;

                console.log("update row", existingRow, columnModel);
                var attrs = {};


                if (columnModel.IsForeignKey) {
                  attrs[updatedColumn] = {
                    id: newValue,
                    type: 'entity'
                  };
                } else {
                  attrs[updatedColumn] = newValue;
                }


                attrs["reference_id"] = existingRow.id
                attrs["id"] = existingRow.id
                attrs["table_name"] = tableName;

                that.invokeEvent({
                    type: "put",
                    params: attrs
                  }
                ).then(function (response) {
                  console.log("update response", response);
                  // if (newValue != response.data[updatedColumn]) {
                  //   spreadsheet.setValueFromCoords(xCell, yCell, response.data[updatedColumn])
                  // }
                });
              }
            },
            oninsertcolumn: function () {
              console.log("insert column", arguments)
            },
            onbeforedeletecolumn: function (container, index, colName) {
              console.log("columns", JSON.stringify(columns, null, 4))
              var colToDelete = columns[index].title;
              console.log("delete column", index, colToDelete);
              var model = that.models.filter(function (e) {
                return e.table_name == tableName
              })[0];

              that.invokeEvent({
                type: 'action',
                params: {
                  action_name: "remove_column",
                  column_name: colToDelete,
                  world_id: model.id
                }
              }).then(function () {
                columns.splice(index, 1);
                that.refreshModels().then(function () {
                  that.setGridData(tableName);
                });
              });

              return true;

            },
            onchangeheader: function (container, colIndex, oldColumnName, newColumnName) {
              console.log("Header change", arguments);

              var found = false;
              var foundIndex = -1;
              for (var i = 0; i < columns.length; i++) {
                if (columns[i].Name == oldColumnName) {
                  found = true;
                  foundIndex = i;
                  break;
                }
              }

              if (found) {
                // rename column

                var model = that.models.filter(function (e) {
                  return e.table_name == tableName
                })[0];
                console.log("table model", model)

                that.invokeEvent({
                  type: 'action',
                  params: {
                    action_name: "rename_column",
                    column_name: oldColumnName,
                    new_column_name: newColumnName,
                    world_id: model.id
                  }
                }).then(function () {
                  that.columns
                })


              } else {
                // add new column to this table

                var schema = JSON.stringify({
                  Tables: [
                    {
                      TableName: tableName,
                      Columns: [
                        {
                          Name: newColumnName,
                          ColumnName: newColumnName,
                          ColumnType: 'label',
                          DataType: 'varchar(50)'
                        }
                      ],
                    }
                  ],
                });


                that.invokeEvent({
                  type: 'action',
                  params: {
                    action_name: 'upload_system_schema',
                    schema_file: [{
                      "name": "new_column.json",
                      "file": "data:application/json;base64," + btoa(schema),
                      "type": "application/json"
                    }],
                  }
                })

              }


            }
          });

          spreadsheet.onchange = function () {
            console.log("grid value changed", arguments)
          }

        }, function (err) {
          console.log("Get data failed", err, model)
        })

      }
    }
  }
</script>

<style scoped>

</style>
