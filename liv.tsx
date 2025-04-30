import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const alturaStatusBar = StatusBar.currentHeight;
const KEY_GEMINI = 'AIzaSyASbuYK_URILv9vicx_B1NMK269XUVklKo'; // Substitua pela sua chave de API

const genAI = new GoogleGenerativeAI(KEY_GEMINI);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 500,
  responseMimeType: "text/plain",
};

export function Liv() {

  const [load, setLoad] = useState(false);
  const [receita, setReceita] = useState("");

  const [ingr1, setIngr1] = useState("");
  const [ingr2, setIngr2] = useState("");
  const [ingr3, setIngr3] = useState("");
  const [ingr4, setIngr4] = useState("");

  async function gerarReceita() {
    if (ingr1 === "" || ingr2 === "" || ingr3 === "" || ingr4 === "") {
      Alert.alert("Atenção", "Informe todos os itens", [{ text: "Beleza!" }]);
      return;
    }
    setReceita("");
    setLoad(true);
    Keyboard.dismiss();

    const prompt = `Me faça uma indicação de livro se baseando nessas informações: Meus gêneros favoritos são: ${ingr1}, ${ingr2}, gosto muitos dos livros de ${ingr3} e gosto de livros de ${ingr4}`;

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      setReceita(result.response.text());
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  }

  return (
    <View style={ESTILOS.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
      <Text style={ESTILOS.header}>Livros pra você!</Text>
      <View style={ESTILOS.form}>
        <Text style={ESTILOS.label}>Preencha os itens abaixo:</Text>
        <TextInput
          placeholder="1 gênero favorito"
          style={ESTILOS.input}
          value={ingr1}
          onChangeText={(texto) => setIngr1(texto)}
        />
        <TextInput
          placeholder="2 gênero favorito"
          style={ESTILOS.input}
          value={ingr2}
          onChangeText={(texto) => setIngr2(texto)}
        />
        <TextInput
          placeholder="Autor (a) favorito (a)"
          style={ESTILOS.input}
          value={ingr3}
          onChangeText={(texto) => setIngr3(texto)}
        />
        <TextInput
          placeholder="Época favorita (Ex: anos 90, 80, 2010)"
          style={ESTILOS.input}
          value={ingr4}
          onChangeText={(texto) => setIngr4(texto)}
        />
      </View>

      <TouchableOpacity style={ESTILOS.button} onPress={gerarReceita}>
        <Text style={ESTILOS.buttonText}>Gerar indicação</Text>
        <MaterialCommunityIcons name="book-open-blank-variant" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
        {load && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Encontrando o melhor livro...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {receita && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Indicação de livro 👇</Text>
            <Text style={{ lineHeight: 24 }}>{receita}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const ESTILOS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54
  },
  form: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#94a3b8',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'blue',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
    marginBottom:100
  }
});
