import pickle


def load_model():
    # Open file in the binary-read mode, load a model
    with open('./models/fashion_mnist_model.pkl', 'rb') as f:
        model = pickle.load(f)

    return model


# Label index to label name relation
fashion_mnist_labels = {
    0: 'T-shirt/top',
    1: 'Trouser',
    2: 'Pullover',
    3: 'Dress',
    4: 'Coat',
    5: 'Sandal',
    6: 'Shirt',
    7: 'Sneaker',
    8: 'Bag',
    9: 'Ankle boot'
}
