const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null; // корень дерева
  }

  root() { // метод для получения корня дерева
    return this._root;
  }

  add(data) { // метод для добавления нового узла в дерево
    const node = this._root;
    if (node === null) { // если корня нет, создаем новый узел и делаем его корнем
      this._root = new Node(data);
      return;
    } else { // если корень есть, находим место для вставки нового узла
      const searchTree = function (node) {
        if (data < node.data) { // если новое значение меньше значения текущего узла, идем влево
          if (node.left === null) { // если слева нет узла, создаем его и делаем потомком текущего узла
            node.left = new Node(data);
            return;
          } else if (node.left !== null) { // если слева уже есть узел, идем влево от текущего узла и повторяем процесс вставки
            return searchTree(node.left);
          }
        } else if (data > node.data) { // если новое значение больше значения текущего узла, идем вправо
          if (node.right === null) { // если справа нет узла, создаем его и делаем потомком текущего узла
            node.right = new Node(data);
            return;
          } else if (node.right !== null) { // если справа уже есть узел, идем вправо от текущего узла и повторяем процесс вставки
            return searchTree(node.right);
          }
        } else { // если значение уже есть в дереве, возвращаем null
          return null;
        }
      };
      return searchTree(node);
    }
  }

  find(data) { // метод для поиска узла по значению
    let current = this._root;
    while (current.data !== data) {
      if (data < current.data) { // если искомое значение меньше значения текущего узла, идем влево
        current = current.left;
      } else { // иначе идем вправо
        current = current.right;
      }
      if (current === null) { // если дошли до конца дерева и не нашли нужного узла, возвращаем null
        return null;
      }
    }
    return current; // возвращаем найденный узел
  }

  has(data) { // метод для проверки, есть ли узел с заданным значением в дереве
    let current = this._root;
    while (current) {
      if (data === current.data) { // если искомое значение равно значению текущего узла, возвращаем true
        return true;
      }
      if (data < current.data) { // если искомое значение меньше значения текущего узла, идем влево
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }


  remove(data) { // метод remove(data) удаляет узел с заданным значением из дерева
    const removeNode = function (node, data) {
      if (node === null) { // если узел не найден, возвращаем null
        return null;
      }
      if (data === node.data) { // если найден узел с заданным значением
        if (node.left === null && node.right === null) { // если узел листовой
          return null;
        }
        if (node.left === null) { // если у узла только правый потомок
          return node.right;
        }
        if (node.right === null) { // если у узла только левый потомок
          return node.left;
        }

        // если у узла два потомка, ищем следующий узел в порядке обхода
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data; // заменяем данные текущего узла данными следующего
        node.right = removeNode(node.right, tempNode.data); // удаляем следующий узел
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this._root = removeNode(this._root, data);
  }


  min() { // метод min() находит минимальное значение в дереве
    let current = this._root;
    while (current.left !== null) { // идем по левым потомкам до конца
      current = current.left;
    }
    return current.data;
  }


  max() { // метод max() находит максимальное значение в дереве
    let current = this._root;
    while (current.right !== null) { // идем по правым потомкам до конца
      current = current.right;
    }
    return current.data;
  }

}

module.exports = {
  BinarySearchTree
};